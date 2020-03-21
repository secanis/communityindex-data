import { mkdirSync, existsSync } from "fs";
import { StructureSchema } from "./structure.schema";
import { Lang } from "../models/lang";

export module CommunityindexConverterHelper {
    const excelToJson = require("convert-excel-to-json");
    const schema: any = StructureSchema.communityindexStructureSchema;
    const distPath = "dist";
    const exportPath = `${distPath}/export`;

    export function checkFolderStructure() {
        mkdirSync(exportPath, { recursive: true });
        const rimraf = require("rimraf");
        rimraf.sync(`${exportPath}/*`);
    }

    export function checkRequiredFiles(langs: Lang[], version: string) {
        langs.forEach(l => {
            if (!existsSync(`${distPath}/je-${l}-${version}.xlsx`)) {
                throw new Error(
                    `Required source Excel file '${distPath}/je-${l}-${version}.xlsx' does not exist...`
                );
            }
        });
    }

    export function parseExcel(langs: Lang[], version: string) {
        return langs.map(l => {
            const file = excelToJson({
                sourceFile: `${distPath}/je-${l}-${version}.xlsx`
            });
            return {
                lang: l,
                data: file[Object.keys(file)[0]]
            };
        });
    }

    export function buildUpDatastructre(inputData: any, lang: Lang) {
        const {
            metadata,
            categories,
            titles,
            dataYearStamp,
            swissData,
            communities
        } = prepareData(inputData);

        return {
            metadata: {
                title: {
                    [lang]: metadata.A
                },
                version: metadata.AQ
            },
            headers: prepareHeaders(categories, titles, dataYearStamp, lang),
            communities: prepareCommunes(communities, lang)
        };
    }

    export function fillDatastructureTranslations(
        datastructure: any,
        inputData: any,
        lang: Lang
    ) {
        const {
            metadata,
            categories,
            titles,
            dataYearStamp,
            swissData,
            communities
        } = prepareData(inputData);

        datastructure.metadata.title[lang] = metadata.A;

        const headers = prepareHeaders(categories, titles, dataYearStamp, lang);
        datastructure.headers.forEach((v: any, i: number) => {
            datastructure.headers[i].fullName[lang] = headers[i].fullName[lang];
            datastructure.headers[i].columns.forEach((c: any, j: number) => {
                datastructure.headers[i].columns[j].fullName[lang] =
                    headers[i].columns[j].fullName[lang];
            });
        });

        return datastructure;
    }

    function prepareData(inputData: any) {
        // parse metadata lines
        const metadata = inputData.shift();
        const categories = Object.entries(inputData.shift());
        const titles = inputData.shift();

        // move id and community names to category
        categories.unshift(["A", titles.A], ["B", titles.B]);
        delete titles.A;
        delete titles.B;

        return {
            metadata,
            categories,
            titles,
            dataYearStamp: Object.entries(inputData.shift()),
            swissData: inputData.shift(),
            communities: inputData.filter((i: any) => i.A && i.AQ)
        };
    }

    function prepareHeaders(
        categories: any[],
        titles: any[],
        dataYearStamp: any[],
        lang: Lang
    ) {
        return categories.map(v => {
            const columns: any = [];
            Object.entries(schema[v[0]].cols).forEach((te: any) => {
                columns.push({
                    column: te[1],
                    fullName: {
                        [lang]: titles[te[0]]
                    },
                    dateOrigin: dataYearStamp[te[0]]
                });
            });

            return {
                category: schema[v[0]].key,
                fullName: {
                    [lang]: v[1].replace(/\s1\)|\s2\)/, "")
                },
                columns
            };
        });
    }

    function prepareCommunes(communitiesRaw: any, lang: Lang) {
        const schemaEntries = Object.entries(schema);
        const communities: any = [];
        communitiesRaw.map((c: any) => {
            const commune: any = {};
            schemaEntries.forEach((s: any) => {
                commune[s[1].key] = {};

                const schemaCols = Object.entries(schema[s[0]].cols);
                if (schemaCols.length === 0) {
                    commune[s[1].key] = c[s[0]];
                } else {
                    schemaCols.forEach((col: any) => {
                        commune[s[1].key][col[1]] = c[col[0]];
                    });
                }
            });
            communities.push(commune);
        });
        return communities;
    }
}

import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { Lang } from '../models/lang';
import * as fetch from 'node-fetch';
import { prepareCommunes, prepareData, prepareHeaders } from './helper';

export namespace CommunityindexConverterHelper {
    const excelToJson = require('convert-excel-to-json');
    const distPath = 'dist';
    const exportPath = `${distPath}/export`;

    export function checkFolderStructure() {
        mkdirSync(exportPath, { recursive: true });
        const rimraf = require('rimraf');
        rimraf.sync(`${exportPath}/*`);
    }

    export function checkRequiredFiles(langs: Lang[], version: string) {
        langs.forEach((l) => {
            if (!existsSync(`${distPath}/je-${l}-${version}.xlsx`)) {
                throw new Error(
                    `Required source Excel file '${distPath}/je-${l}-${version}.xlsx' does not exist...`
                );
            }
        });
    }

    export function parseExcel(langs: Lang[], version: string) {
        return langs.map((l) => {
            const file = excelToJson({
                sourceFile: `${distPath}/je-${l}-${version}.xlsx`,
            });
            return {
                lang: l,
                data: file[Object.keys(file)[0]],
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
            communities,
        } = prepareData(inputData);

        return {
            metadata: {
                title: {
                    [lang]: metadata.A,
                },
                version: metadata.AQ,
            },
            headers: prepareHeaders(categories, titles, dataYearStamp, lang),
            communities: prepareCommunes(communities, lang),
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
            communities,
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

    export function downloadEnergyCityLabelList(programId: string) {
        fetch
            .default(
                `https://www.local-energy.swiss/.rest/energiestadt/v1/profiles/list/lang/de/queryString/any/programs/${programId}/counties/any`
            )
            .then((res) => res.json())
            .then((json) => {
                writeFileSync(
                    'dist/export/energy-city.json',
                    JSON.stringify(json, null, 2)
                );
                writeFileSync(
                    'dist/export/energy-city.metadata.json',
                    JSON.stringify(
                        {
                            date: new Date(),
                            programId: programId,
                        },
                        null,
                        2
                    )
                );
            });
    }
}

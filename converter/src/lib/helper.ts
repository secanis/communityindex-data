import { StructureSchema } from './structure.schema';
import { Lang } from '../models/lang';

const schema: any = StructureSchema.communityindexStructureSchema;

export function prepareData(inputData: any) {
    // parse metadata lines
    const metadata = inputData.shift();
    const categories = Object.entries(inputData.shift());
    const titles = inputData.shift();

    // move id and community names to category
    categories.unshift(['A', titles.A], ['B', titles.B]);
    delete titles.A;
    delete titles.B;

    return {
        metadata,
        categories,
        titles,
        dataYearStamp: Object.entries(inputData.shift()),
        swissData: inputData.shift(),
        communities: inputData.filter((i: any) => i.A && i.AQ),
    };
}

export function prepareHeaders(
    categories: any[],
    titles: any[],
    dataYearStamp: any[],
    lang: Lang
) {
    return categories.map((v) => {
        const columns: any = [];
        Object.entries(schema[v[0]].cols).forEach((te: any) => {
            columns.push({
                column: te[1],
                fullName: {
                    [lang]: titles[te[0]],
                },
                dateOrigin: dataYearStamp[te[0]],
            });
        });

        return {
            category: schema[v[0]].key,
            fullName: {
                [lang]: v[1].replace(/\s1\)|\s2\)/, ''),
            },
            columns,
        };
    });
}

export function prepareCommunes(communitiesRaw: any, lang: Lang) {
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

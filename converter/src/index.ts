import { Command, flags } from "@oclif/command";
import { writeFileSync } from "fs";
import * as Listr from "listr";

import { CommunityindexConverterHelper } from "./lib/helper";
import { Lang } from "./models/lang";

class CommunityindexDataConverter extends Command {
    static description =
        "Dataconverter to parse communes portraits data from the Swiss FSO";

    static flags = {
        input: flags.string({
            char: "I",
            required: true,
            description:
                "Version which you have downloaded, is required for the build process."
        }),
        version: flags.version({
            char: "v"
        }),
        debug: flags.boolean({
            char: "d",
            default: false
        }),
        help: flags.help({ char: "h" }),
        langs: flags.string({
            char: "L",
            multiple: true,
            required: true,
            description:
                "Languages to convert, you have to download the specific files first!\n\
    Options:\n\
      d -> Deutsch/German\n\
      e -> Englisch/English\n\
      f -> Französisch/French\n\
      i -> Italienisch/Italian\n\
\n\
    Examples:\n\
      -L d -L e\n\
"
        })
    };

    async run() {
        const { args, flags } = this.parse(CommunityindexDataConverter);
        const toJsonSchema = require("to-json-schema");
        const log = this.log;

        // const configuration = require("./configuration.json");

        log("communityindex-data converter");
        log(`fetching languages:     ${flags.langs.join()}`);
        log(`fetching version:       ${flags.input}`);

        const result: any = {
            fileMetadata: null,
            datastructure: null
        };

        const tasks = new Listr(
            [
                {
                    title: "preparing necessary folders",
                    task: () => {
                        CommunityindexConverterHelper.checkFolderStructure();
                    }
                },
                {
                    title: "check required files",
                    task: () => {
                        CommunityindexConverterHelper.checkRequiredFiles(
                            flags.langs as Lang[],
                            flags.input
                        );
                    }
                },
                {
                    title: "parsing excel files",
                    task: () => {
                        result.fileMetadata = CommunityindexConverterHelper.parseExcel(
                            flags.langs as Lang[],
                            flags.input
                        );
                    }
                },
                {
                    title: "build data structure",
                    task: ctx => {
                        const listrTasks = new Listr([]);
                        result.fileMetadata.forEach((file: any, i: number) => {
                            ctx.i = 0;
                            listrTasks.add({
                                title: `processing language '${file.lang}'`,
                                task: ctx => {
                                    if (ctx.i === 0) {
                                        result.datastructure = CommunityindexConverterHelper.buildUpDatastructre(
                                            result.fileMetadata[ctx.i].data,
                                            result.fileMetadata[ctx.i].lang
                                        );
                                    } else {
                                        result.datastructure = CommunityindexConverterHelper.fillDatastructureTranslations(
                                            result.datastructure,
                                            result.fileMetadata[ctx.i].data,
                                            result.fileMetadata[ctx.i].lang
                                        );
                                    }
                                    ctx.i++;
                                }
                            });
                        });
                        return listrTasks;
                    }
                },
                {
                    title: "export data",
                    task: ctx => {
                        const listrTasks = new Listr([]);
                        Object.keys(result.datastructure).forEach(k => {
                            ctx.i = 0;
                            listrTasks.add({
                                title: `export data '${k}'`,
                                task: ctx => {
                                    const keys = Object.keys(
                                        result.datastructure
                                    );
                                    const data =
                                        result.datastructure[keys[ctx.i]];
                                    writeFileSync(
                                        `dist/export/${flags.input}-${
                                            keys[ctx.i]
                                        }.json`,
                                        JSON.stringify(data, null, 2)
                                    );
                                    ctx.i++;
                                }
                            });
                        });
                        return listrTasks;
                    }
                },
                {
                    title: "export schema",
                    task: ctx => {
                        const listrTasks = new Listr([]);
                        Object.keys(result.datastructure).forEach(k => {
                            ctx.i = 0;
                            listrTasks.add({
                                title: `export schema '${k}'`,
                                task: ctx => {
                                    const keys = Object.keys(
                                        result.datastructure
                                    );
                                    const schema = toJsonSchema(
                                        result.datastructure[keys[ctx.i]],
                                        {
                                            arrays: { mode: "first" }
                                        }
                                    );
                                    writeFileSync(
                                        `dist/export/${flags.input}-${
                                            keys[ctx.i]
                                        }.schema.json`,
                                        JSON.stringify(schema, null, 2)
                                    );
                                    ctx.i++;
                                }
                            });
                        });
                        return listrTasks;
                    }
                }
            ],
            //@ts-ignore
            { collapse: false }
        );

        tasks.run().then(() => {
            this.log
        }).catch((err: Error) => {
            if (flags.debug) this.error(err.message);
        });
    }
}

export = CommunityindexDataConverter;

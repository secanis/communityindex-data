export class StructureSchema {
    static communityindexStructureSchema = {
        A: {
            key: "_id",
            cols: {}
        },
        B: {
            key: "name",
            cols: {}
        },
        C: {
            key: "population",
            cols: {
                C: "total",
                D: "change",
                E: "concentration",
                F: "foreigner"
            }
        },
        G: {
            key: "demography",
            cols: {
                G: "youths",
                H: "middle",
                I: "older"
            }
        },
        J: {
            key: "populationChange",
            cols: {
                J: "crudeMarriageRate",
                K: "crudeDivorceRate",
                L: "crudeBirthRate",
                M: "crudeMortalityRate"
            }
        },
        N: {
            key: "household",
            cols: {
                N: "total",
                O: "size"
            }
        },
        P: {
            key: "area",
            cols: {
                P: "total",
                Q: "settlement",
                R: "settlementChange",
                S: "agricultural",
                T: "agriculturalChange",
                U: "wooded",
                V: "unproductive"
            }
        },
        W: {
            key: "economy",
            cols: {
                W: "employed",
                X: "employedPrimarySector",
                Y: "employedSecondarySector",
                Z: "employedTertiarySector",
                AA: "workingPlace",
                AB: "workingPlacePrimarySector",
                AC: "workingPlaceSecondarySector",
                AD: "workingPlaceTertiarySector"
            }
        },
        AE: {
            key: "housing",
            cols: {
                AE: "dwellingVacancyRate",
                AF: "newHousingUnits"
            }
        },
        AG: {
            key: "social",
            cols: {
                AG: "assistanceRate"
            }
        },
        AH: {
            key: "politics",
            cols: {
                AH: "fdp",
                AI: "cvp",
                AJ: "sp",
                AK: "svp",
                AL: "evp",
                AM: "glp",
                AN: "bdp",
                AO: "pda",
                AP: "gps",
                AQ: "srw"
            }
        }
    };
}

/**
 * Created by nbenik on 9/11/2017.
 */

// https://nhanes.hms.harvard.edu/rest/v1/resourceService/resources
[{
    "id": 1,
    "name": "nhanes",
    "ontologyType": "TREE",
    "implementation": "i2b2/tranSMART",
    "relationships": ["PARENT", "CHILD", "SIBLING", "MODIFIER", "TERM"],
    "logicaloperators": ["AND", "OR", "NOT"],
    "predicates": [{
        "predicateName": "CONTAINS",
        "displayName": "Contains",
        "description": "Contains value",
        "default": true,
        "fields": [{
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }],
        "dataTypes": ["STRING", "INTEGER", "FLOAT"],
        "paths": []
    }, {
        "predicateName": "CONSTRAIN_MODIFIER",
        "displayName": "Constrain by Modifier",
        "description": "Constrain by Modifier",
        "default": false,
        "fields": [{
            "name": "Modifier",
            "path": "MODIFIER_KEY",
            "description": "Constrain by a modifier of this entity",
            "required": true,
            "dataTypes": [],
            "permittedValues": [],
            "relationship": "MODIFIER"
        }, {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }],
        "dataTypes": ["STRING", "INTEGER", "FLOAT"],
        "paths": []
    }, {
        "predicateName": "CONSTRAIN_VALUE",
        "displayName": "Constrain by Value",
        "description": "Constrains by Value",
        "default": false,
        "fields": [{
            "name": "Operator",
            "path": "OPERATOR",
            "description": "Operator",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["EQ", "NE", "GT", "GE", "LT", "LE", "BETWEEN", "LIKE[exact]", "LIKE[begin]", "LIKE[end]", "LIKE[contains]"]
        }, {
            "name": "Constraint",
            "path": "CONSTRAINT",
            "description": "Constraint",
            "required": true,
            "dataTypes": [{"name": "string", "pattern": "^.*$", "description": "A string value"},
                {"name": "integer", "pattern": "^\\d+$", "description": "An integer value"},
                {"name": "float", "pattern": "^([+-]?\\d*\\.?\\d*)$", "description": "A float value"}
            ],
            "permittedValues": []
        }, {
            "name": "Unit of Measure",
            "path": "UNIT_OF_MEASURE",
            "description": "Unit of Measure",
            "required": false,
            "dataTypes": [{"name": "string", "pattern": "^.*$", "description": "A string value"}],
            "permittedValues": []
        }, {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }],
        "dataTypes": ["STRING", "INTEGER", "FLOAT"],
        "paths": []
    }, {
        "predicateName": "CONSTRAIN_DATE",
        "displayName": "Constrain by Date",
        "description": "Constrains by Date",
        "default": false,
        "fields": [{
            "name": "From Inclusive",
            "path": "FROM_INCLUSIVE",
            "description": "Inclusive From Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }, {
            "name": "From Time",
            "path": "FROM_TIME",
            "description": "From Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["START_DATE", "END_DATE"]
        }, {
            "name": "From Date",
            "path": "FROM_DATE",
            "description": "From Date",
            "required": true,
            "dataTypes": [{
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
            }],
            "permittedValues": []
        }, {
            "name": "To Inclusive",
            "path": "TO_INCLUSIVE",
            "description": "Inclusive To Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }, {
            "name": "To Time",
            "path": "TO_TIME",
            "description": "To Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["START_DATE", "END_DATE"]
        }, {
            "name": "To Date",
            "path": "TO_DATE",
            "description": "To Date",
            "required": true,
            "dataTypes": [{
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
            }],
            "permittedValues": []
        }, {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": ["YES", "NO"]
        }],
        "dataTypes": [],
        "paths": []
    }],
    "selectOperations": [],
    "selectFields": [],
    "joins": [],
    "sorts": [],
    "processes": [],
    "visualization": [],
    "dataTypes": [{
        "name": "dateTime",
        "pattern": "^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})$",
        "description": "Date in yyyy-mm-dd hh:mm:ss format. With hours in 24 hour format"
    }, {
        "name": "date",
        "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
        "description": "Date in yyyy-mm-dd format",
        "typeof": "dateTime"
    }, {"name": "integer", "pattern": "^\\d+$", "description": "An integer value"}, {
        "name": "string",
        "pattern": "^.*$",
        "description": "A string value"
    }, {"name": "float", "pattern": "^([+-]?\\d*\\.?\\d*)$", "description": "A float value"}]
}]

// https://nhanes.hms.harvard.edu/rest/v1/resourceService/path/nhanes/
    [{
    "pui": "/nhanes/Demo",
    "name": "Demo",
    "displayName": "Demo",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {}
}]

// https://nhanes.hms.harvard.edu/rest/v1/resourceService/path/nhanes/Demo
    [{
    "pui": "/nhanes/Demo/demographics/demographics/",
    "name": "demographics",
    "displayName": "demographics",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "sourcesystemCd": null,
        "columnname": "concept_path",
        "visualattributes": "CA ",
        "synonymCd": "N",
        "totalnum": "0",
        "operator": "LIKE",
        "level": "0",
        "facttablecolumn": "concept_cd",
        "tablename": "concept_dimension",
        "name": "demographics",
        "columndatatype": "T",
        "comment": null,
        "dimcode": "\\demographics",
        "key": "\\\\demographics\\demographics\\",
        "tooltip": "\\demographics\\"
    }
}, {
    "pui": "/nhanes/Demo/examination/examination/",
    "name": "examination",
    "displayName": "examination",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "0",
        "sourcesystemCd": null,
        "columnname": "concept_path",
        "tablename": "concept_dimension",
        "facttablecolumn": "concept_cd",
        "name": "examination",
        "columndatatype": "T",
        "visualattributes": "CA ",
        "comment": null,
        "dimcode": "\\examination\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\examination\\examination\\",
        "tooltip": " "
    }
}, {
    "pui": "/nhanes/Demo/laboratory/laboratory/",
    "name": "laboratory",
    "displayName": "laboratory",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "0",
        "sourcesystemCd": null,
        "columnname": "concept_path",
        "tablename": "concept_dimension",
        "facttablecolumn": "concept_cd",
        "name": "laboratory",
        "columndatatype": "T",
        "visualattributes": "CA ",
        "comment": null,
        "dimcode": "\\laboratory\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\laboratory\\laboratory\\",
        "tooltip": " "
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/",
    "name": "questionnaire",
    "displayName": "questionnaire",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "0",
        "sourcesystemCd": null,
        "columnname": "concept_path",
        "tablename": "concept_dimension",
        "facttablecolumn": "concept_cd",
        "name": "questionnaire",
        "columndatatype": "T",
        "visualattributes": "CA ",
        "comment": null,
        "dimcode": "\\questionnaire\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\",
        "tooltip": " "
    }
}]

    [{
    "pui": "/nhanes/Demo/questionnaire/questionnaire/alcohol use/",
    "name": "alcohol use",
    "displayName": "alcohol use",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "alcohol use",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\alcohol use\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\alcohol use\\",
        "tooltip": "\\questionnaire\\alcohol use\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/bacterial infection/",
    "name": "bacterial infection",
    "displayName": "bacterial infection",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "bacterial infection",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\bacterial infection\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\bacterial infection\\",
        "tooltip": "\\questionnaire\\bacterial infection\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/cognitive functioning/",
    "name": "cognitive functioning",
    "displayName": "cognitive functioning",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "cognitive functioning",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\cognitive functioning\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\cognitive functioning\\",
        "tooltip": "\\questionnaire\\cognitive functioning\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/disease/",
    "name": "disease",
    "displayName": "disease",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "disease",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\disease\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\disease\\",
        "tooltip": "\\questionnaire\\disease\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/food component recall/",
    "name": "food component recall",
    "displayName": "food component recall",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "food component recall",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\food component recall\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\food component recall\\",
        "tooltip": "\\questionnaire\\food component recall\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/housing/",
    "name": "housing",
    "displayName": "housing",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "housing",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\housing\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\housing\\",
        "tooltip": "\\questionnaire\\housing\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/immunization/",
    "name": "immunization",
    "displayName": "immunization",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "immunization",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\immunization\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\immunization\\",
        "tooltip": "\\questionnaire\\immunization\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/occupation/",
    "name": "occupation",
    "displayName": "occupation",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "occupation",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\occupation\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\occupation\\",
        "tooltip": "\\questionnaire\\occupation\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/pharmaceutical/",
    "name": "pharmaceutical",
    "displayName": "pharmaceutical",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "pharmaceutical",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\pharmaceutical\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\pharmaceutical\\",
        "tooltip": "\\questionnaire\\pharmaceutical\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/physical fitness/",
    "name": "physical fitness",
    "displayName": "physical fitness",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "physical fitness",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\physical fitness\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\physical fitness\\",
        "tooltip": "\\questionnaire\\physical fitness\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/sexual behavior/",
    "name": "sexual behavior",
    "displayName": "sexual behavior",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "sexual behavior",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\sexual behavior\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\sexual behavior\\",
        "tooltip": "\\questionnaire\\sexual behavior\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/smoking behavior/",
    "name": "smoking behavior",
    "displayName": "smoking behavior",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "smoking behavior",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\smoking behavior\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\smoking behavior\\",
        "tooltip": "\\questionnaire\\smoking behavior\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/smoking family/",
    "name": "smoking family",
    "displayName": "smoking family",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "smoking family",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\smoking family\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\smoking family\\",
        "tooltip": "\\questionnaire\\smoking family\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/social support/",
    "name": "social support",
    "displayName": "social support",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "social support",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\social support\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\social support\\",
        "tooltip": "\\questionnaire\\social support\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/street drug/",
    "name": "street drug",
    "displayName": "street drug",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "street drug",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\street drug\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\street drug\\",
        "tooltip": "\\questionnaire\\street drug\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/sun exposure/",
    "name": "sun exposure",
    "displayName": "sun exposure",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "sun exposure",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\sun exposure\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\sun exposure\\",
        "tooltip": "\\questionnaire\\sun exposure\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/supplement use/",
    "name": "supplement use",
    "displayName": "supplement use",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "supplement use",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\supplement use\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\supplement use\\",
        "tooltip": "\\questionnaire\\supplement use\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/viral infection/",
    "name": "viral infection",
    "displayName": "viral infection",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "1",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "viral infection",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\viral infection\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\viral infection\\",
        "tooltip": "\\questionnaire\\viral infection\\"
    }
}]



// https://nhanes.hms.harvard.edu/rest/v1/resourceService/path/nhanes/Demo/questionnaire/questionnaire/viral%20infection
[{
    "pui": "/nhanes/Demo/questionnaire/questionnaire/viral infection/Doctor ever told you had genital herpes/",
    "name": "Doctor ever told you had genital herpes",
    "displayName": "Doctor ever told you had genital herpes",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "2",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "Doctor ever told you had genital herpes",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\viral infection\\Doctor ever told you had genital herpes\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\viral infection\\Doctor ever told you had genital herpes\\",
        "tooltip": "\\questionnaire\\viral infection\\Doctor ever told you had genital herpes\\"
    }
}, {
    "pui": "/nhanes/Demo/questionnaire/questionnaire/viral infection/Doctor ever told you had genital warts/",
    "name": "Doctor ever told you had genital warts",
    "displayName": "Doctor ever told you had genital warts",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {
        "valuetypeCd": null,
        "level": "2",
        "sourcesystemCd": null,
        "columnname": "CONCEPT_PATH",
        "tablename": "CONCEPT_DIMENSION",
        "facttablecolumn": "CONCEPT_CD",
        "name": "Doctor ever told you had genital warts",
        "columndatatype": "T",
        "visualattributes": "FA ",
        "comment": null,
        "dimcode": "\\questionnaire\\viral infection\\Doctor ever told you had genital warts\\",
        "synonymCd": "N",
        "operator": "LIKE",
        "key": "\\\\questionnaire\\questionnaire\\viral infection\\Doctor ever told you had genital warts\\",
        "tooltip": "\\questionnaire\\viral infection\\Doctor ever told you had genital warts\\"
    }
}]
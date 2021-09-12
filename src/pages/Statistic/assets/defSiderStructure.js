import {
    UserOutlined, 
    TeamOutlined, 
    RocketTwoTone, 
    EyeOutlined, 
    SettingOutlined, 
    CalendarOutlined, 
} from '@ant-design/icons';

const dateNow = new Date();

export const TYPES = {
    CHECK_GROUP: 0,
    RADIO_GROUP: 1,
    PERIOD_PICKER: 2,
}

export default [
    {
        "type": TYPES.RADIO_GROUP,
        "title": "Param0",
        "options": [
            {
                "title": "Op0",
                "icon": UserOutlined,
                "sel": false
            },
            {
                "title": "Op1",
                "icon": TeamOutlined,
                "sel": false
            }
        ],
    },
    {
        "type": TYPES.CHECK_GROUP,
        "title": "Param1",
        "icon": RocketTwoTone,
        "options": [
            {
                "title": "Op0",
                "icon": RocketTwoTone,
                "sel": false
            },
            {
                "title": "Op1",
                "icon": RocketTwoTone,
                "sel": false
            },
            {
                "title": "Op2",
                "icon": RocketTwoTone,
                "sel": false
            }
        ]
    },
    {
        "type": TYPES.CHECK_GROUP,
        "title": "Param2",
        "icon": EyeOutlined,
        "options": [
            {
                "title": "Op0",
                "icon": EyeOutlined,
                "sel": false
            },
            {
                "title": "Op1",
                "icon": EyeOutlined,
                "sel": false
            },
            {
                "title": "Op2",
                "icon": EyeOutlined,
                "sel": false
            },
            {
                "title": "Op3",
                "icon": EyeOutlined,
                "sel": false
            }
        ]
    },
    // {
    //     "type": TYPES.PERIOD_PICKER,
    //     "title": "Param3",
    //     "icon": CalendarOutlined,
    //     "from": new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()-7),
    //     "to": dateNow
    // }
]
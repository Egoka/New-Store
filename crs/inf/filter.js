filter = [
    {
        name: "Производитель",
        icon:"assistant_photo",
        options:[
            {id:'apple',name: "apple"},
            {id:'samsung',name: "samsung"},
            {id:'HONOR',name: "HONOR"},
            {id:'HUAWEI',name: "HUAWEI"},
            {id:'OPPO',name: "OPPO"}
        ]},
    {
        name:"Операционная система",
        icon:"phone_android",
        options:[
            {id:'Android',name: "Android"},
            {id:'iOS',name: "iOS"}
        ]},
    {
        name: "Диагональ экрана",
        icon:"developer_mode",
        options:[
            {id:'',name:"3.5-4.9"},
            {id:'',name:"5.0-5.4"},
            {id:'',name:"5.5-5.9"},
            {id:'',name:"6.0-6.4"},
            {id:'',name:"больше"}
        ]},
    {
        name: "Количество камер",
        icon:"photo_camera",
        options:[
            {id:'',name:"1"},
            {id:'',name:"2"},
            {id:'',name:"3"},
            {id:'',name:"4"},
            {id:'',name:"5"}
        ]},
    {
        name: "Память",
        icon:"memory",
        options:[
            {name:"512ГБ"},
            {name:"256ГБ"},
            {name:"128ГБ"},
            {name:"64ГБ"},
            {name:"32ГБ"},
            {name:"16ГБ"}
        ]}
]
productTypes = [
    {
        id:0,
        name:"Смартфоны",
        icon:"smartphone"
    },
    {
        id:1,
        name:"Ноутбуки",
        icon:"laptop"
    },
    {
        id:2,
        name:"Гарнитура",
        icon:"headset"
    }
    ,
    {
        id:3,
        name:"Часы",
        icon:"watch"
    },
    {
        id:4,
        name:"Компьютеры",
        icon:"desktop_windows"
    },
    {
        id:5,
        name:"Телевизоры",
        icon:"tv"
    }
]
products = [
    {
        id: 0,
        name: 'Apple iPhone 12 Pro',
        photoURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021660000',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'104990',
        colorBackground:'#d7c4a9',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 1,
        name: 'Google Pixel 5',
        photoURL: 'https://www.ixbt.com/img/n1/news/2020/8/5/google-pixel-5-official-press-renders-in-black-and-green-colors-243_large.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'70990',
        colorBackground:'#95aca4',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id:2,
        name: 'MacBook Air',
        photoURL: 'https://onlyphones.ru/wp-content/uploads/2018/11/macbook_air-spacegay-2018-min.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            },
            {
                nameDescription: "Экран",
                parameter: [
                    {value: 'цветной Super AMOLED, 16.78 млн цветов, сенсорный', name: "Тип экрана"},
                    {value: 'мультитач, емкостный', name: "Тип сенсорного экрана"},
                    {value: '6.5 дюйм.', name: "Диагональ"}]
            }
        ],
        price:'90900',
        colorBackground:'#95aca4',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 3,
        name: 'Google Pixel 3',
        photoURL: 'https://cdn.shopify.com/s/files/1/0280/2037/5604/products/PIXEL3.3xlclean_1600x.png?v=1588653300',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'50990',
        colorBackground:'#353535',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 4,
        name: 'Смартфон iPhone 12 mini',
        photoURL: 'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12-mini/Blue/Apple-iPhone-12-mini-Blue-backimage.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'80990',
        colorBackground:'#3db4d1',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 5,
        name: 'Смартфон iPhone 12 mini',
        photoURL: 'https://i-store.net/slides/ipad-air-4generation-2020.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'80990',
        colorBackground:'#3db4d1',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 6,
        name: 'Смартфон iPhone 12 mini',
        photoURL: 'https://justalk.ru/UserFiles/Image/air_2020_03.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'80990',
        colorBackground:'#3db4d1',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 7,
        name: 'Смартфон iPhone 12 mini',
        photoURL: 'https://i01.appmifile.com/webfile/globalimg/Cindy/J3SSilvery.png',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'80990',
        colorBackground:'#3db4d1',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
    {
        id: 8,
        name:'Apple Watch Series 3 GPS',
        photoURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/42-alu-silver-sport-white-nc-s3-1up_GEO_RU?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1594318652000',
        description:[
            {
                nameDescription: "Общие характеристики",
                parameter: [
                    {value: 'iOS 14', name: "Операционная система"},
                    {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                    {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                    {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                    {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
            }
        ],
        price:'30990',
        colorBackground:'#3db4d1',
        recallList:[
            {size: 5,value: 0},
            {size: 4,value: 2},
            {size: 3,value: 1},
            {size: 2,value: NaN},
            {size: 1,value: 22}
        ]
    },
]
selection = [
    {
        id: 0,
        title:'Apple iPhone 12 Pro',
        text:'Твой лучший смартфон',
        photoURL:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021660000',
        colorBackground:'#fbebd3',
        titleColor:'#968967'
    },
    {
        id: 1,
        title:'Google Pixel 5',
        text:'Твой лучший смартфон',
        photoURL:'https://www.ixbt.com/img/n1/news/2020/8/5/google-pixel-5-official-press-renders-in-black-and-green-colors-243_large.png',
        colorBackground:'#95aca4',
        titleColor:'#b4ffd4'
    },
    {
        id: 3,
        title:'Apple iPad',
        text:'Лучший планшет',
        photoURL:'https://nice-case.ru/images/detailed/6/ipad-air-select-wifi-green-202009_2qln-1c.png',
        colorBackground:'#abbda8',
        titleColor:'#ffffff'
    },
]
topics = [
    {
        title:'Смартфоны',
        photoURL:'https://uswitch-mobiles-contentful.imgix.net/kf81nsuntxeb/7aw4bwl1kz4BJTu53zzrj2/9322e44aa2e721a2a8d83de6c38e9e0a/iphone-12-blue-back.png',
        backColor:'#e0d4bd',
        titleColor:'#fff'
    },
    {
        title:'Планшеты',
        photoURL:'https://nice-case.ru/images/detailed/6/ipad-air-select-wifi-silver-202009_n0ye-6s.png',
        backColor:'#ababab',
        titleColor:'#fff'
    },
    {
        title:'Умные часы',
        photoURL:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/42-alu-silver-sport-white-nc-s3-1up_GEO_RU?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1594318652000',
        backColor:'#d1e0bd',
        titleColor:'#fff'
    },
    {
        title:'Наушники',
        photoURL:'https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/hero-airpods-pro.png',
        backColor:'#434343',
        titleColor:'#fff'
    }
]
brands = [
    {
        id:0,
        name:'Samsung',
        photoURL:'https://avatars.mds.yandex.net/get-mpic/195452/img_id2759917287098020085/orig',
        backColor:'#fff',
        rating:5,
        price: 50000,
        format:'store'

    },
    {
        id:1,
        name:'Apple',
        photoURL:'https://avatars.mds.yandex.net/get-mpic/1862933/img_id5477847296568171778.png/orig',
        backColor:'#fff',
        rating:4.9,
        price: 60000,
        format:'courier'
    },
    {
        id:2,
        name:'Apple',
        photoURL:'https://avatars.mds.yandex.net/get-mpic/195452/img_id8818173109963086273/orig',
        backColor:'#fff',
        rating:3.2,
        price: 70000,
        format:'store'
    },
    {
        id:3,
        name:'Apple',
        photoURL:'https://avatars.mds.yandex.net/get-mpic/195452/img_id3721536365809417611/orig',
        backColor:'#fff',
        rating:2,
        price: 80000,
        format:'courier'
    },
    {
        id:4,
        name:'Apple',
        photoURL:'https://avatars.mds.yandex.net/get-mpic/1521939/img_id5633223812447011726.png/orig',
        backColor:'#fff',
        rating:1,
        price: 9000,
        format:'store'
    }
]
product = {
    id:514,
    name: 'iPhone 12 Pro',
    photoURL: 'https://www.ixbt.com/img/n1/news/2020/8/5/google-pixel-5-official-press-renders-in-black-and-green-colors-243_large.png',
    description:[
        {
            nameDescription: "Общие характеристики",
            parameter: [
                {value: 'iOS 14', name: "Операционная система"},
                {value: 'поддержка двух SIM-карт', name: "Симкарта"},
                {value: 'экран 6.53", разрешение 2340x1080', name: "Экран"},
                {value: '4 камеры: широкоугольная (13 МП), сверхширокоугольная', name: "Камеры"},
                {value: 'процессор MediaTek Helio G80', name: "Процессор"}]
        },
        {
            nameDescription: "Экран",
            parameter: [
                {value: 'цветной Super AMOLED, 16.78 млн цветов, сенсорный', name: "Тип экрана"},
                {value: 'мультитач, емкостный', name: "Тип сенсорного экрана"},
                {value: '6.5 дюйм.', name: "Диагональ"}]
        }
    ],
    price:'90900',
    colorBackground:'#95aca4',
    recallList:[
        {size: 5,value: 0},
        {size: 4,value: 2},
        {size: 3,value: 1},
        {size: 2,value: NaN},
        {size: 1,value: 22}
    ]
}
account= {
    nameOne: "Николай",
    nameTwo: "Гоголь",
    verifiedUser: "true",
    emailUser: "gogol@gmail.com",
    photoUser: "https://briefly.ru/static/authors/gogol.jpg?1479846041"
}
recall = [
    {
        name:"Николай Г.",
        verifiedUser:"true",
        photoUser: "https://briefly.ru/static/authors/gogol.jpg?1479846041",
        idProduct:1,
        product:'Apple iPhone 12 Pro',
        photo:"https://avatars.mds.yandex.net/get-market-ugc/2386291/2a000001717380ad438b79b7b7f87ef534a6/700-700",
        rating:2,
        date:'Sat Nov 21 2020 05:22:22 GMT+0300 (Москва, стандартное время)',
        like:45,
        likeNot:5,
        advantages:"Always On Display",
        limitations:"Не выявлено",
        comment:"Пятую серию приобрел взамен четвертой. Брал именно из-за функции “Always On Display”. Как были у меня 44мм Space Gray, так и остались. Очень нравится, что дисплей постоянно работает, и можно мгновенно увидеть необходимую информацию без лишних \"изящных\" движений руками .\n" +
            "Не понимаю, почему жалуются на автономность: “пятерки” мне хватает ровно на столько же, как и ‘четверки”, но только теперь постоянно горит дисплей. Использование интенсивное: постоянные уведомления, оплаты, иногда короткие ответы по телефону, ежедневная 45-ти минутная беговая тренировка, включены абсолютно все функци. Через сутки остается примерно 30-40%. Считаю, что для таких часов автономность приличная. Если отключать Siri и другие ненужные функции, думаю хватит на пару дней. Заряжаются часы быстро.\n" +
            "Apple Watch рекомендую тем, кто занимается любительским (да и профессиональным) спортом, совершает пробежки и прочее. Максимально удобно реализованы функции тренировки для легкой атлетики: нажал, пробежал – все посчитано и записано в Айфон: средняя скорость, каденс, пульс, геолокация и так делее.\n" +
            "Покупать их просто ради уведомлений и как аксессуар я бы особо не рекомендовал. Но, если вы ведете более-менее активный образ жизни, часы буду для вас незаменимы.\n" +
            "Желательно защитить дисплей защитным стеклом или пленкой, так как в алюминиевой версии стоить обычное стекло, как в телефоне, которое довольно хрупкое, а вот корпус довольно-таки прочный."
    },
    {
        name:"Александр П.",
        verifiedUser:null,
        photoUser: "https://avatars.mds.yandex.net/get-zen_doc/1878668/pub_5cf4beb15c133600b374ebdb_5cf4d481bb53da00af249c20/scale_1200",
        idProduct:0,
        product:'Apple iPad Air',
        rating:2,
        date:'Sat Nov 30 2020 01:22:22 GMT+0300 (Москва, стандартное время)',
        like:null,
        likeNot:null,
    }
]
basket = [
    {
        idProduct:0,
        productName:'iPhone 12 mini',
        price:55000,
        quantity:4
    },
    {
        idProduct:1,
        productName:'Apple iPhone 12 Pro',
        price:55000,
        quantity:2
    },
    {
        idProduct:2,
        productName:'Google Pixel 5',
        price:55000,
        quantity:5
    },
    {
        idProduct:3,
        productName:'Apple iPad Air',
        price:55000,
        quantity:1
    },
]
orders=[
    {
        idOrders:'hg53j45gj34h5g34k5g',
        dateOrders:'2020-10-26T11:10:50.805+00:00',
        priseOrders:90000,
        products:[{
                productName:'iphone 12 mini Красный',
                priceProduct:90000,
                amountProduct:1}]
    },
    {
        idOrders:'hg53j45gj34h5g34k5g',
        dateOrders:'2021-10-26T11:10:50.805+00:00',
        priseOrders:90000,
        products:[{
            productName:'iphone 12 mini Красный',
            priceProduct:90000,
            amountProduct:1}]
    }
]
module.exports = {filter, products, selection, topics, brands, product,account, recall, productTypes, basket,orders}
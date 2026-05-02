/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
   // purchase — это одна из записей в поле items из чека в data.purchase_records
   // _product — это продукт из коллекции data.products
   const { discount, sale_price, quantity } = purchase;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
    const { profit } = seller;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
   // Здесь проверим входящие данные
   // В функциях с более чем десятью строками эти шаги есть почти всегда:
   // 1 Проверить переданные данные.
   // 2 Проверить нужные для работы настройки/опции/зависимости.
   // 3 Собрать промежуточные данные.
   // 4 Выполнить основные действия.
   // 5 Сформировать итоговый ответ. allow pasting

   // проверки

   // Проверка входных данных
   if (!data 
        || !Array.isArray(data.sellers)
        || data.sellers.length === 0
        // ... остальные проверки
    ) {
        throw new Error('Некорректные входные данные');
    }
   
    //Проверка опций и функций
    if (typeof options !== "object" || options === null) {
        throw new Error("Опции не являются объектом");
    }

   const { calculateRevenue, calculateBonus } = options; // Сюда передадим функции для расчётов

   if (!calculateRevenue || !calculateBonus) {
        throw new Error("Функции для расчетов не переданы");
    }

   // Подготовка промежуточных данных
   const sellerStats = data.sellers.map(seller => ({
        // заполним начальными данными
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
        }));

   // Здесь посчитаем промежуточные данные и отсортируем продавцов

   // Вызовем функцию расчёта бонуса для каждого продавца в отсортированном массиве

   // Сформируем и вернём отчёт

    // @TODO: Проверка входных данных

    // @TODO: Проверка наличия опций

    // @TODO: Подготовка промежуточных данных для сбора статистики

    // @TODO: Индексация продавцов и товаров для быстрого доступа

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}



/*
    Структура данных:

const data = {
    customers: [{ // Коллекция покупателей
            id: "customer_1", // Уникальный идентификатор покупателя
            first_name: "Andrey", // Имя покупателя
            last_name: "Alekseev", // Фамилия покупателя
            phone: "+79296758019", // Контактный телефон, уникальный (но не точно)
            workplace: "SteelWorks", // Место работы
            position: "Worker" // Должность
        }],
    products: [{ // Коллекция товаров
            name: "Cement #100", // Наименование
            category: "Paints", // Категория
            sku: "SKU_001", // Уникальный артикул
            purchase_price: 460.34, // За сколько магазин покупает товар
            sale_price: 699.99 // За сколько магазин планирует продавать товар
        }],
    sellers: [{ // Коллекция продавцов
            id: "seller_1", // Уникальный идентификатор продавца
            first_name: "Alexey", // Имя продавца
            last_name: "Petrov", // Фамилия продавца
            start_date: "2024-07-17", // Когда начал работать в магазине
            position: "Senior Seller" // Текущая должность
        }],
    purchase_records: [{ // Коллекция записей о продажах, чеки
            receipt_id: "receipt_1", // Уникальный идентификатор чека
            date: "2023-12-04", // Дата покупки
            seller_id: "seller_5", // Идентификатор продавца
            customer_id: "customer_1", // Идентификатор покупателя
            items: [{ // Перечень купленных товаров
                    "sku": "SKU_027", // Артикул товара
                    "discount": 7.68, // Скидка от продавца (в процентах)
                    "quantity": 1, // Сколько единиц конкретного товара куплено
                    "sale_price": 919.07 // Цена в момент продажи без учёта скидки
            }],
            total_amount: 4657.56, // Общая сумма чека с учетом скидки
            total_discount: 271.71 // Общая сумма скидки с чека (в рублях)
        }]
};

что должна вынести:

[{
    seller_id: 'seller_1', // Идентификатор продавца
    name: 'Alexey Petrov', // Имя и фамилия продавца
    revenue: 123456, // Общая выручка с учётом скидок
    profit: 12345, // Прибыль от продаж продавца
    sales_count: 20, // Количество продаж
    top_products: [  // Топ-10 проданных товаров в штуках
        {
            sku: 'SKU_001', // Артикул товара
            quantity: 12, // Сколько продано
        },
    ],
    bonus: 1234, // Итоговый бонус в рублях, не процент
}];

*/

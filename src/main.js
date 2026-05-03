/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */

// @TODO: Расчет выручки от операции
function calculateSimpleRevenue(purchase, _product) {
   // purchase — это одна из записей в поле items из чека в data.purchase_records
   // _product — это продукт из коллекции data.products
    const { discount, sale_price, quantity } = purchase;
    
    // Коэффициент скидки: 1 - (скидка в процентах / 100)
    const discountFactor = 1 - (discount / 100);
    
    // Выручка: цена × количество × коэффициент скидки
    const revenue = sale_price * quantity * discountFactor;
    
    // Вернуть выручку
    return revenue;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */

// @TODO: Расчет бонуса от позиции в рейтинге
function calculateBonusByProfit(index, total, seller) {
    const { profit } = seller;

     if (index === 0) {
        return profit * 0.15;
    } else if (index === 1 || index === 2) {
        return profit * 0.10;
    } else if (index === total - 1) {
        return 0;
    } else {
        return profit * 0.05;
    }
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

   // @TODO: Проверка входных данных

   if (!data 
        || !Array.isArray(data.sellers)
        || data.sellers.length === 0
    ) {
        throw new Error('Некорректные входные данные');
    }
   
    // @TODO: Проверка наличия опций
    if (typeof options !== "object" || options === null) {
        throw new Error("Опции не являются объектом");
    }

   const { calculateRevenue, calculateBonus } = options; // Сюда передадим функции для расчётов

   if (!calculateRevenue || !calculateBonus) {
        throw new Error("Функции для расчетов не переданы");
    }

   // @TODO: Подготовка промежуточных данных для сбора статистики
   const sellerStats = data.sellers.map(seller => ({
        // заполним начальными данными
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
        }));

    // @TODO: Индексация продавцов и товаров для быстрого доступа
    // это массив объектов-счетчиков. У каждого продавца свой объект
    const sellerIndex = Object.fromEntries(sellerStats.map(item => [item.id, item]));

    // объект для быстрого доступа к нужному счетчику по id
    const productIndex = Object.fromEntries(data.products.map(item => [item.sku, item]));

    // @TODO: Расчет выручки и прибыли для каждого продавца
    data.purchase_records.forEach(record => { // Чек 
        const seller = sellerIndex[record.seller_id]; // Продавец
        seller.sales_count = seller.sales_count + 1; // Увеличить количество продаж 
        seller.revenue = seller.revenue + record.total_amount; // Увеличить общую сумму выручки всех продаж

        // Расчёт прибыли для каждого товара
        record.items.forEach(item => {
        const product = productIndex[item.sku];
    
        // Себестоимость товара в этой покупке
        const cost = product.purchase_price * item.quantity;
    
        // Выручка с учетом скидки (вызов функции calculateRevenue)
        const revenue = calculateRevenue(item, product);
        
        // Прибыль от этого товара
        const profitFromItem = revenue - cost;
    
        // Добавить прибыль к общей прибыли продавца
        seller.profit = seller.profit + profitFromItem;
    
        // Учет количества проданных товаров
        if (!seller.products_sold[item.sku]) {
        seller.products_sold[item.sku] = 0;
        }
        seller.products_sold[item.sku] = seller.products_sold[item.sku] + item.quantity;
        });
    });

    // @TODO: Сортировка продавцов по прибыли
    const sortedSellers = sellerStats.toSorted((a, b) => {
    return b.profit - a.profit; // По убыванию (от большего к меньшему)
    });

    // @TODO: Назначение премий на основе ранжирования
    sortedSellers.forEach((seller, index) => {
    const total = sortedSellers.length;
    seller.bonus = calculateBonus(index, total, seller);

    // сформировать топ 10 продавцов
    seller.top_products = Object.entries(seller.products_sold)
    .map(([sku, quantity]) => ({ sku, quantity }))
    .toSorted((a, b) => b.quantity - a.quantity)
    .slice(0, 10);
    });

    // @TODO: Подготовка итоговой коллекции с нужными полями
    return sortedSellers.map(seller => ({
    seller_id: seller.id,
    name: seller.name,
    revenue: +seller.revenue.toFixed(2),
    profit: +seller.profit.toFixed(2),
    sales_count: seller.sales_count,
    top_products: seller.top_products,
    bonus: +seller.bonus.toFixed(2)
    }));
}


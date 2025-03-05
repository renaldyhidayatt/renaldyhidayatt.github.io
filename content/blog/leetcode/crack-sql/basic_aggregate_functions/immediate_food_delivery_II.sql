WITH FirstOrders AS (
    SELECT
        customer_id,
        MIN(order_date) AS first_order_date
    FROM
        Delivery
    GROUP BY
        customer_id
),
CustomerFirstOrders AS (
    SELECT
        d.customer_id,
        d.delivery_id,
        d.order_date,
        d.customer_pref_delivery_date
    FROM
        Delivery d
    JOIN
        FirstOrders f
    ON
        d.customer_id = f.customer_id AND d.order_date = f.first_order_date
)
SELECT
    ROUND(SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS immediate_percentage
FROM
    CustomerFirstOrders;

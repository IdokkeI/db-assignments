'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data Ordered BY city and then BY name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    debugger;
    let result = await db.query(`
    SELECT
        EmployeeID as "Employee Id",
        CONCAT(FirstName, ' ', LastName) AS "Employee Full Name",
        Title as "Title",
        City as "City"
    FROM Employees
        Order BY City, "Employee Full Name"
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list Ordered BY Order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    debugger;
    let result = await db.query(`
    SELECT 
        OrderID as "Order Id",
        SUM(UnitPrice * Quantity) as "Order Total Price",
        ROUND(SUM(Discount * Quantity)/SUM(UnitPrice * Quantity) * 100,3) as "Total Order Discount, %"    
    FROM OrderDetails
    GROUP BY OrderID
    ORDER BY OrderID desc
    `);
    return result[0];
}

/**
 *  Create a query to return all customers FROM USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    debugger;
    let result = await db.query(`
    SELECT
        CustomerID as "CustomerId",
        CompanyName as "CompanyName"
    FROM Customers
        WHERE Country = "USA" and Fax is null;
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all Orders |
 *
 * Order data BY % - higher percent at the top, then BY CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    debugger;
    let result = await db.query(`
    SELECT 
        CustomerID as "Customer Id",
        COUNT(CustomerID) as "Total number of Orders",
        ROUND(count(*) / SUM(count(*)) OVER() * 100, 5) as "% of all orders"    
    FROM Orders
    GROUP BY CustomerID
    ORDER BY 3 desc, CustomerID asc
    `);
    return result[0];
}

/**
 * Return all products WHERE product name starts with 'A', 'B', .... 'F' Ordered BY name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
    SELECT
        ProductID as "ProductId",
        ProductName as "ProductName",
        QuantityPerUnit as "QuantityPerUnit"
    FROM Products
        WHERE ProductName between "A" and "G"
    ORDER BY ProductName
    `);
    return result[0];
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order BY ProductName then BY SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
    SELECT 
        ProductName as "ProductName",
        CategoryName as "CategoryName",
        CompanyName as "SupplierCompanyName"
    FROM Products 
       INNER JOIN Categories on Products.CategoryID = Categories.CategoryID
       INNER JOIN Suppliers on Products.SupplierID = Suppliers.SupplierID
    ORDER BY 1, 3
    
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Order data BY EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
    SELECT  
	    e.EmployeeID as 'EmployeeId',
	    CONCAT(e.FirstName,' ',e.LastName) as "FullName",
	    IFNULL(CONCAT(r.FirstName,' ',r.LastName),'-') as "ReportsTo"
    FROM Employees e
        LEFT OUTER JOIN Employees r ON r.EmployeeID = e.ReportsTo
    ORDER BY e.EmployeeID
    `);
    return result[0];
}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
    SELECT 
        c.CategoryName,
        count(p.CategoryID) as "TotalNumberOfProducts"
    FROM Products p 
        INNER JOIN Categories c	on p.CategoryID = c.CategoryID
    GROUP BY c.CategoryName
    ORDER BY 1
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and rests may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
    SELECT 
	    CustomerID,
        ContactName
    FROM Customers
        WHERE ContactName like 'F__n%'
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
    SELECT 
        ProductID,
        ProductName
    FROM Products
        WHERE Discontinued > 0
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) WHERE products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order BY UnitPrice then BY ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
    SELECT 
	    ProductName,
        UnitPrice
    FROM Products
        WHERE UnitPrice between 5 and 15
        Order BY UnitPrice, ProductName
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products BY price then BY ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
    SELECT 	
        ProductName,
        UnitPrice
    FROM (SELECT * FROM Products Order BY UnitPrice desc limit 20) T
        Order BY UnitPrice asc, ProductName asc
    `);
    return result[0];
}

/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
    SELECT
        (SELECT count(*) FROM Products) as "TotalOfCurrentProducts",
        SUM(Discontinued) as "TotalOfDiscontinuedProducts"
    FROM Products;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on Order:
 * | ProductName | UnitsOnOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
    SELECT 
        ProductName,
        UnitsOnOrder,
        UnitsInStock
    FROM Products
	    WHERE UnitsInStock < UnitsOnOrder
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of Orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
    SELECT  
	    COUNT(IF(MONTHNAME(OrderDate)="January",1,Null)) as "January",
        COUNT(IF(MONTHNAME(OrderDate)="February",1,Null)) as "February",
        COUNT(IF(MONTHNAME(OrderDate)="March",1,Null)) as "March",
        COUNT(IF(MONTHNAME(OrderDate)="April",1,Null)) as "April",
        COUNT(IF(MONTHNAME(OrderDate)="May",1,Null)) as "May",
        COUNT(IF(MONTHNAME(OrderDate)="June",1,Null)) as "June",
        COUNT(IF(MONTHNAME(OrderDate)="July",1,Null)) as "July",
        COUNT(IF(MONTHNAME(OrderDate)="August",1,Null)) as "August",
        COUNT(IF(MONTHNAME(OrderDate)="September",1,Null)) as "September",
        COUNT(IF(MONTHNAME(OrderDate)="October",1,Null)) as "October",
        COUNT(IF(MONTHNAME(OrderDate)="November",1,Null)) as "November",
	    COUNT(IF(MONTHNAME(OrderDate)="December",1,Null)) as "December"
    FROM Orders 
        WHERE YEAR(OrderDate)='1997'
    ORDER BY OrderDate
    `);
    return result[0];
}

/**
 * Create a SQL query to return all Orders WHERE ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
    SELECT 
        OrderID,
        CustomerID,
        ShipCountry
    FROM Orders
	    WHERE ShipPostalCode is not null
    `);
    return result[0];
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order BY AvgPrice descending then BY CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
    SELECT c.CategoryName,
		avg(p.UnitPrice) as "AvgPrice"
    FROM Products p
        INNER JOIN Categories c on c.CategoryID = p.CategoryID
    GROUP BY 1
    ORDER BY 2 desc, 1
        `);
        return result[0];
}

/**
 * Create a SQL query to calcualte total Orders count BY each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * OrderDate needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
    SELECT
        *,
        COUNT(T.OrderDate) as "Total Number of Orders"
        FROM (SELECT date_format(OrderDate, '%Y-%m-%d %T') as "OrderDate"
    FROM Orders 
        WHERE YEAR(OrderDate) = 1998 and 
        MONTH(OrderDate) between 1 and 12 and 
        DAY(OrderDate) between 1 and 31) T
    GROUP BY 1
        `);
        return result[0];
}

/**
 * Create a SQL query to display customer details whose total Orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order BY "TotalOrdersAmount, $" descending then BY CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
    SELECT
        o.CustomerID,
        c.CompanyName,
        SUM(od.Quantity * od.UnitPrice) as "TotalOrdersAmount, $"
    FROM Orders o
        INNER JOIN Customers c on c.CustomerID = o.CustomerID
        INNER JOIN OrderDetails od on od.OrderID = o.OrderID
    GROUP BY 1
    HAVING SUM(od.Quantity * od.UnitPrice) > 10000
    Order BY 3 desc, 1 desc
        `);
        return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
    SELECT
        e.EmployeeID,
        CONCAT(e.FirstName, " ", e.LastName) as "Employee Full Name",
        SUM(od.UnitPrice*od.Quantity) as "Amount, $"
    FROM Employees e
        INNER JOIN Orders o on o.EmployeeID = e.EmployeeID
        INNER JOIN OrderDetails od on od.OrderID = o.OrderID
        GROUP BY 1
        Order BY 3 desc limit 1
        `);
        return result[0];
}

/**
 * Write a SQL statement to get the maximum purchase amount of all the Orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
    SELECT
        OrderID,
        SUM(UnitPrice*Quantity) as "Maximum Purchase Amount, $"
    FROM OrderDetails
        GROUP BY 1
        Order BY 2 desc limit 1
        `);
        return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * Order BY PricePerItem descending and them BY CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(`
    SELECT 
	    DISTINCT CompanyName as "CompanyName",
        p.ProductName as "ProductName",
        PricePerItem as "PricePerItem"
    FROM
        (
        SELECT  
		    Customers.CompanyName, 
		    Customers.CustomerID, 
		    MAX(OrderDetails.UnitPrice) AS "PricePerItem"
	    FROM Customers 
	    INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID 
	    INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID 
	    GROUP BY CompanyName, CustomerID) as PriceTable
    INNER JOIN Orders ON PriceTable.CustomerID = Orders.CustomerID 
    INNER JOIN OrderDetails ON PricePerItem = OrderDetails.UnitPrice AND Orders.OrderID = OrderDetails.OrderID 
    INNER JOIN Products p ON p.ProductID = OrderDetails.ProductID 
    Order BY PricePerItem DESC, CompanyName, ProductName;
        `);
        return result[0];
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};

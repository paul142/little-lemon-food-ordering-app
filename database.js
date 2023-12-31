import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('create table if not exists menuitems (' + 'id integer primary key not null,' + ' image text,' + ' name text,' + ' price text,' + ' description text,' + ' category text);');
        }, reject, resolve);
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menuitems', [], (_, {rows}) => {
                resolve(rows._array);
            });
        });
    });
}

export function saveMenuItems(menuItems) {
    db.transaction((tx) => {
        menuItems.map(data => {
            tx.executeSql('INSERT INTO menuitems (id, image, name, price, category, description ) VALUES (?,?,?,?,?,?)', [data.id, data.image, data.name, data.price, data.category, data.description]);
        });
    });
}

export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
        let a = JSON.stringify(activeCategories).replace('[', '').replace(']', '');
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM `menuitems` WHERE `name` LIKE '%" + query + "%' AND `category` IN (" + a + ")", [], (_, {rows}) => {
                resolve(rows._array);
            });
        });
    });
}

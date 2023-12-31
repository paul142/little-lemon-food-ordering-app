import {useEffect, useRef} from 'react';

export function getSectionListData(data) {
    const listData = [];
    data.forEach((a) => {
        const d = listData.findIndex(({title}) => title === a.category);
        const dataItems = {id: a.id, name: a.name, price: a.price, description: a.description, image: a.image}
        if (d < 0) {
            listData.push({
                data: [dataItems],
                title: a.category,
            })
        } else {
            listData[d].data.push(dataItems)
        }
    })
    return listData;
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}

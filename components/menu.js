import {Alert, SafeAreaView, SectionList, StyleSheet, Text} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getSectionListData, useUpdateEffect} from "../utils";
import debounce from 'lodash.debounce';
import {Searchbar} from 'react-native-paper';
import Filters from "./Filters";
import {createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems} from "../database";
import Item from "./Item";

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts", "drinks"];

export default function Menu() {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            const menu = json.menu.map((a, i) => ({
                id: i,
                name: a.name,
                price: a.price.toString(),
                description: a.description,
                image: a.image,
                category: a.category,
            }));
            return (menu);
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();
                if (!menuItems.length) {
                    const menuItems = await fetchData();
                    saveMenuItems(menuItems);
                }
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    return (<SafeAreaView style={styles.container}>
        <Searchbar
            placeholder="Search"
            placeholderTextColor="white"
            onChangeText={handleSearchChange}
            value={searchBarText}
            style={styles.searchBar}
            iconColor="white"
            inputStyle={{color: 'white'}}
            elevation={0}
        />
        <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
        />
        <SectionList
            style={styles.sectionList}
            sections={data}
            keyExtractor={(item) => item?.id}
            renderItem={({item}) => (
                <Item data={item}/>
            )}
            renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    },
    searchBar: {
        backgroundColor: "#495e57",
        borderRadius: 0,
    },
    sectionList: {
        marginHorizontal: 20,
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 16,
        color: "#495e57",
        padding: 5,
        fontFamily: "Karla-Medium",
        backgroundColor: '#ffffff'
    }
});

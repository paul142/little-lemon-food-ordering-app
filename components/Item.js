import {Image, StyleSheet, Text, View} from 'react-native';

export default function Item(props) {
    return (<View style={styles.item}>
        <View style={styles.itemBody}>
            <Text style={styles.title}>{props?.data?.name}</Text>
            <Text style={styles.description}>{props?.data?.description}</Text>
            <Text style={styles.price}>${props?.data?.price}</Text>
        </View>
        {
            (props?.data?.image) &&
            <Image
                style={styles.img}
                source={{
                    uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${props?.data?.image}?raw=true`,
                }}
            />
        }
    </View>);
}

const styles = StyleSheet.create({

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        padding: 10,
    },
    itemBody: {
        paddingRight: 10,
        flex: 1,
    },
    title: {
        fontSize: 20,
        paddingVertical: 8,
        backgroundColor: "#fff",
        fontFamily: "Karla-Bold",
    },
    description: {
        color: "#495e57",
        paddingRight: 5,
        fontFamily: "Karla-Regular",
    },
    price: {
        fontSize: 20,
        color: "#495e57",
        paddingTop: 5,
        fontFamily: "Karla-Medium",
    },
    img: {
        width: 100,
        height: 100,
    },
});

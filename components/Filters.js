import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Filters({onChange, selections, sections}) {
    return (<View style={styles.filtersContainer}>
        <Text style={styles.filtersH1}>
            ORDER FOR DELIVERY!
        </Text>
        <View style={styles.filtersWrap}>
            {sections.map((section, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => {
                    onChange(index);
                }}
                style={[styles.btn, {
                    flex: 1 / sections.length, backgroundColor: selections[index] ? '#edefee' : '#495e57',
                }]}>
                <View>
                    <Text style={[styles.btnText, {color: selections[index] ? "#495e57" : "#edefee"}]}>
                        {section}
                    </Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
    </View>);
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        margin: 3,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15
    }, btnText: {
        fontFamily: "Karla-Bold", fontSize: 14,
    }, filtersContainer: {
        backgroundColor: '#ffffff', padding: 10
    }, filtersWrap: {
        paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
    }, filtersH1: {
        paddingTop: 20, paddingHorizontal: 5, fontSize: 18, fontFamily: "Karla-Bold",
    }
});

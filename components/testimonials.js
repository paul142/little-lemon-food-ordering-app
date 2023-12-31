import {Image, StyleSheet, Text, View} from "react-native";
import PagerView from 'react-native-pager-view';
import {Foundation} from '@expo/vector-icons';
import Img01 from '../assets/t-01.jpg';
import Img02 from '../assets/t-02.jpg';
import Img03 from '../assets/t-03.jpg';

const TestimonialsList = [{
    img: Img01,
    name: 'Andrea Smith',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, reiciendis.'
}, {
    img: Img02,
    name: 'Jane Marks',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, reiciendis.'
}, {
    img: Img03,
    name: 'Mark James',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, reiciendis.'
},];

export function StarBox() {
    return (<View style={styles.starBox}>
        {Array(5).fill(1).map((el, i) => <Foundation
            key={i}
            name="star"
            size={20}
            color="#f4ce14"
        />)}
    </View>)
}

export function TestimonialsItem(props) {
    return (<View style={styles.page} key={props.index}>
        <View style={styles.testimonialsBox}>
            <Image source={props.data.img} style={styles.testimonialsImg}/>
            <View style={styles.testimonialsContent}>
                <StarBox/>
                <Text style={styles.testimonialsH1}>{props.data.name}</Text>
                <Text style={styles.testimonialsP}>{props.data.text}</Text>
            </View>
        </View>

        <View style={styles.pageIndicator}>
            {Array(TestimonialsList.length).fill(1).map((el, i) => <View
                style={[styles.pageDot, (i === props.index) ? styles.pageDotActive : null]} key={i}></View>)}
        </View>
    </View>)
}

export default function Testimonials() {
    return (<PagerView style={styles.viewPager} initialPage={0}>
        {TestimonialsList.map((val, i) => (<TestimonialsItem data={val} index={i} key={i}/>))}
    </PagerView>);
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    }, page: {
        justifyContent: 'center', alignItems: 'center',
    }, testimonialsBox: {
        padding: 15,
        borderRadius: 15,
        margin: 15,
        backgroundColor: '#ffffff',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: "row",
        alignItems: 'center',
    }, testimonialsContent: {
        paddingLeft: 15, flex: 1, justifyContent: "center", alignItems: "flex-start",
    }, testimonialsH1: {
        fontSize: 18, fontFamily: "Karla-Medium", margin: 0, padding: 0
    }, testimonialsP: {
        color: "#000", fontFamily: "Karla-Medium", fontSize: 12,
    }, testimonialsImg: {
        width: 75, height: 75, borderRadius: 50,
    }, starBox: {
        padding: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
    }, pageIndicator: {
        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20,
    }, pageDot: {
        backgroundColor: "#67788a", width: 6, height: 6, marginHorizontal: 6, borderRadius: 6,
    }, pageDotActive: {
        backgroundColor: "#f4ce14", width: 6, height: 6, borderRadius: 6,
    },
});

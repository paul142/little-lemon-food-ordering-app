import {KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup'
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

export default function SignUp(props) {
    const {onboard} = useContext(AuthContext);
    const emailValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required('Email Address is Required'), firstName: yup
            .string()
            .min(2, 'Too short!')
            .required('First Name is Required'), lastName: yup
            .string()
            .min(2, 'Too short!')
            .required('Last Name is Required'),
    });

    return (<KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View style={[styles.formHaderBox]}>
            <Text style={[styles.formHaderH1]}>
                Let's Get Started!
            </Text>
            <Text style={styles.formHaderH2}>
                Create an account to Little Lemon to get all features
            </Text>
        </View>
        <Formik
            initialValues={{firstName: '', lastName: '', email: ''}}
            onSubmit={values => console.log(values)}
            validationSchema={emailValidationSchema}
        >
            {({handleChange, errors, handleBlur, handleSubmit, values, touched}) => (<View>
                <View style={[styles.inputBox]}>
                    <TextInput
                        style={[styles.input, errors.firstName && styles.inputError]}
                        placeholder="Enter your First Name"
                        value={values.firstName}
                        touched={touched.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                    />
                    {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
                </View>
                <View style={[styles.inputBox]}>
                    <TextInput
                        style={[styles.input, errors.lastName && styles.inputError]}
                        placeholder="Enter your Last Name"
                        value={values.lastName}
                        touched={touched.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                    />
                    {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
                </View>
                <View style={[styles.inputBox]}>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Enter your email address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        touched={touched.email}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                </View>
                <View style={[styles.inputBox]}>
                    <Pressable
                        style={[styles.btn, styles.btnDark, Object.keys(errors).length ? styles.btnDisabled : styles.btnDark]}
                        onPress={() => {
                            Object.keys(errors).length < 1 && onboard(values)
                        }}
                        disabled={Object.keys(errors).length}
                    >
                        <Text style={[styles.btnText, styles.btnTextDark]}>Next</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => props.navigation.navigate('LogIn')}
                    ><Text style={styles.footerText}>
                        Already heve an account? <Text
                        style={styles.footerLink}>Login
                        here</Text>
                    </Text></Pressable>
                </View>
            </View>)}
        </Formik>
    </KeyboardAvoidingView>);
}

const styles = StyleSheet.create({
    content: {
        marginBottom: 30,
    }, formHaderBox: {
        alignItems: "center", paddingBottom: 25
    }, formHaderH1: {
        fontSize: 28, fontFamily: "Karla-Bold", textAlign: 'center',
    }, formHaderH2: {
        fontSize: 16, fontFamily: "Karla-Regular", textAlign: 'center', color: '#495e57'
    }, inputBox: {
        paddingVertical: 10, alignItems: "center",
    }, input: {
        borderColor: "#cccccc",
        backgroundColor: "#ffffff",
        alignSelf: "stretch",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 250,
        fontSize: 16,
        fontFamily: "Karla-Medium",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }, inputError: {
        borderColor: 'red'
    }, container: {
        flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center",
    }, error: {
        color: 'red', fontSize: 14, marginBottom: 5, alignSelf: 'flex-end'
    }, btn: {
        marginVertical: 5,
        width: 130,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#495e57',
        color: '#495e57',
        backgroundColor: "#ffffff",
        alignItems: "center",
    }, btnDark: {
        color: "#ffffff", backgroundColor: '#495e57',
    }, btnText: {
        fontFamily: "Karla-Medium", fontSize: 16,
    }, btnTextDark: {
        color: "#ffffff",
    }, btnDisabled: {
        borderColor: '#cccccc', backgroundColor: '#cccccc',
    }, footerText: {
        alignItems: "center",
        marginBottom: 20,
        fontSize: 14,
        fontFamily: "Karla-Regular",
        paddingTop: 50,
        color: '#495e57',
    }, footerLink: {
        fontFamily: "Karla-Bold", color: '#000'
    }
});

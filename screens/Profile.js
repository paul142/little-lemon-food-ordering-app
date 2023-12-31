import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import * as yup from "yup";
import "yup-phone-lite";
import {Formik} from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
    const {update, logout} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');
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
            .required('Last Name is Required'), phone: yup
            .string()
            .phone("US", "Please enter a valid phone number")
    });
    const [profile, setProfile] = useState({});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        return (!result.canceled) && setImageUri(result.assets[0].uri);
    };

    useEffect(() => {
        (async () => {
            try {
                const getProfile = JSON.parse(await AsyncStorage.getItem("profile"));
                setProfile(getProfile);
                setImageUri(getProfile.image);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(true);
            }
        })();
    }, []);

    if (!loading) {
        return null
    }

    return (<ScrollView>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Formik
                initialValues={profile}
                onSubmit={values => console.log(values)}
                validationSchema={emailValidationSchema}
            >
                {({
                      resetForm,
                      handleChange,
                      errors,
                      handleBlur,
                      handleSubmit,
                      values,
                      touched,
                      setFieldValue
                  }) => (<View style={styles.content}>
                    <Text style={[styles.formHaderH1]}>
                        Personal information
                    </Text>

                    <View style={[styles.inputBox]}>
                        <Text style={styles.label}>Avatar</Text>
                        <View style={styles.avatarBox}>
                            {imageUri ? (
                                <Image
                                    source={{uri: imageUri}}
                                    style={styles.avatarImg}
                                />
                            ) : (
                                <View style={styles.avatarEmpty}>
                                    <Text style={styles.avatarText}>
                                        {values?.firstName[0]}{values?.lastName[0]}
                                    </Text>
                                </View>
                            )}
                            <View style={[styles.btnBox, styles.avatarBtnBox]}>
                                <Pressable
                                    style={[styles.btn, styles.btnDark]}
                                    title="Pick an image from camera roll"
                                    onPress={pickImage}
                                >
                                    <Text style={[styles.btnText, styles.btnTextDark]}>Change</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.btn]}
                                    title="Pick an image from camera roll"
                                    onPress={() => {
                                        setImageUri('');
                                    }}
                                >
                                    <Text style={[styles.btnText]}>Remove</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.inputBox]}>
                        <Text style={[styles.label]}>First Name</Text>
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
                        <Text style={[styles.label]}>Last Name</Text>
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
                        <Text style={[styles.label]}>Email</Text>
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
                        <Text style={[styles.label]}>Phone number</Text>
                        <TextInput
                            style={[styles.input, errors.phone && styles.inputError]}
                            placeholder="Enter your phone number"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            touched={touched.phone}
                        />
                        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                    </View>
                    <Text style={[styles.formHaderH1]}>
                        Email notification
                    </Text>
                    <View style={styles.checkboxBox}>
                        <Checkbox
                            style={styles.checkbox}
                            value={values?.orderStatuses}
                            onValueChange={(val) => setFieldValue("orderStatuses", val)}
                            color={"#495e57"}
                        />
                        <Text style={styles.checkboxP}>Order statuses</Text>
                    </View>
                    <View style={styles.checkboxBox}>
                        <Checkbox
                            style={styles.checkbox}
                            value={values?.passwordChanges}
                            onValueChange={(val) => setFieldValue("passwordChanges", val)}
                            color={"#495e57"}
                        />
                        <Text style={styles.checkboxP}>Password changes</Text>
                    </View>
                    <View style={styles.checkboxBox}>
                        <Checkbox
                            style={styles.checkbox}
                            value={values?.specialOffers}
                            onValueChange={(val) => setFieldValue("specialOffers", val)}
                            color={"#495e57"}
                        />
                        <Text style={styles.checkboxP}>Special offers</Text>
                    </View>
                    <View style={styles.checkboxBox}>
                        <Checkbox
                            style={styles.checkbox}
                            value={values?.newsletter}
                            onValueChange={(val) => setFieldValue("newsletter", val)}
                            color={"#495e57"}
                        />
                        <Text style={styles.checkboxP}>Newsletter</Text>
                    </View>
                    <View style={[styles.btnBox]}>
                        <Pressable
                            style={[styles.btn, styles.btnY]}
                            onPress={() => logout()}
                        >
                            <Text style={[styles.btnText]}>Log Out</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.btnBox]}>
                        <Pressable
                            style={[styles.btn]}
                            onPress={() => {
                                setImageUri(profile.image);
                                resetForm({values: profile})
                            }}
                        >
                            <Text style={[styles.btnText]}>Discard changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.btnDark, Object.keys(errors).length ? styles.btnDisabled : styles.btnDark]}
                            disabled={Object.keys(errors).length}
                            onPress={() => {
                                values.image = imageUri;
                                Object.keys(errors).length < 1 && update(values)
                            }}
                        >
                            <Text style={[styles.btnText, styles.btnTextDark]}>Save changes</Text>
                        </Pressable>

                    </View>
                </View>)}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>);
}

const styles = StyleSheet.create({
    formHaderBox: {
        alignItems: "flex-start", paddingBottom: 25
    }, formHaderH1: {
        padding: 5, paddingTop: 10, fontSize: 18, fontFamily: "Karla-Bold", textAlign: 'left'
    }, inputBox: {
        paddingBottom: 5,
    }, checkboxBox: {
        paddingLeft: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center',
    },
    avatarBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    avatarImg: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    avatarEmpty: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#495e57',
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: '#ffffff',
        fontFamily: "Karla-Bold",
        fontSize: 45,
    },
    avatarBtnBox: {
        flex: 2
    },
    btnBox: {
        paddingTop: 15, paddingBottom: 5, justifyContent: "space-between", flexDirection: "row",
    }, checkboxP: {padding: 5, fontSize: 12, fontFamily: "Karla-Bold",}, label: {
        padding: 5, fontSize: 12, fontFamily: "Karla-Bold",
    }, input: {
        marginHorizontal: 5,
        borderColor: "#EDEFEE",
        backgroundColor: "#ffffff",
        alignSelf: "stretch",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        fontFamily: "Karla-Regular",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }, inputError: {
        borderColor: 'red'
    }, container: {
        padding: 15, flex: 1, backgroundColor: "#fff", justifyContent: "stretch", alignItems: "stretch",
    }, error: {
        color: 'red', fontSize: 14, marginBottom: 5, alignSelf: 'flex-end'
    }, btn: {
        flex: 1,
        margin: 5,
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
    }, btnY: {backgroundColor: "#f4ce14"}, btnText: {
        fontFamily: "Karla-ExtraBold", fontSize: 14, color: '#000000'
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

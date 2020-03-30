import React from 'react';
import { useNavigation, useRoute} from '@react-navigation/native'; //useRoute para pegar parâmetros
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer'


import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const icdt = route.params.incidents;
    const message = `Olá ${icdt.name} estou entrando em contato pois gostaria de ajudar no caso "${icdt.title}" com o valor de 
                    ${Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(icdt.value)}`;

    function navigateBack(){
        navigation.goBack();
    }
    function sendMail(){
        // instalar compomente para envio de e-mail => expo install expo-mail-composer
        MailComposer.composeAsync({
            subject:`Herói do caso: ${icdt.title}`,
            recipients: [icdt.email],
            body: message,
        })
    }
    function sendWhatsapp(){
        //Linking.openURL(`whatsapp://send?phone=5512996056688&text=${message}`);
        Linking.openURL(`whatsapp://send?phone=55${icdt.whatsapp}&text=${message}`);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incidents}>
                <Text style={styles.incidentProperty, { marginTop: 0}}>ONG:</Text>
                <Text style={styles.incidentValue}>{icdt.name} de {icdt.city}/{icdt.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{icdt.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {
                        Intl.NumberFormat('pt-BR',{
                            style:'currency', currency:'BRL'
                        }).format(icdt.value)
                    }
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
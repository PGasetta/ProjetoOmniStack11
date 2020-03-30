import React, { useState , useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incidents){
        navigation.navigate('Detail', {incidents});
    }

    async function loadIncidents(){
        if (loading){
            return;
        }
        
        if(total>0 && incidents.length==total){
            return; //ultima página provavelmente - não precisa continuar carregando
        }

        setLoading(true);
        const response = await api.get('incidents',{
            params: { page }
        });

        setIncidents([...incidents, ...response.data]); // está é a forma correta de anexar dois vetores dentro de um unico vetor
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(()=>{
        loadIncidents();
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
                
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incidents => String(incidents.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incidents }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incidents.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incidents.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {
                                Intl.NumberFormat('pt-BR',{
                                    style:'currency', currency:'BRL'
                                }).format(incidents.value)
                            }
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailButton}
                            onPress={() => navigateToDetail(incidents)} //sempre que precisar passar parâmetro usar função falsa
                            >
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                            </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
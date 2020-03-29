import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles.js'

export default function Incidents(){
    const [totalItems, setTotalItems] = useState(0);

    const [page, setPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [incidents, setIncidents] = useState([]);
    const Navigation = useNavigation();

    function navigationDetail(incident){
        Navigation.navigate('Detail', { incident })  
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(totalItems > 0 && incidents.length === totalItems){
            return;
        }

        setLoading(true);
       
        const response = await api.get('/incidents',  {
            params: { page }
        }) ;
        
        setIncidents([...incidents, ...response.data]);
        setTotalItems(response.headers['x-total-count']);
        setPages(page + 1)
        setLoading(false);

    }

    useEffect(() => {
      loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}> 
                Total <Text style={styles.headerTextBold}>{totalItems} Casos</Text>
                </Text>
            </View>
            
            <Text style={styles.title}>Bem-Vindo ! </Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList 
            style={styles.incidentsList}
            keyExtractor={incident => String(incident.id)}
            //showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            data={incidents}
            renderItem={({item: incident}) => (
                <View style={styles.incident}>
                <Text style={styles.incidentProper}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProper}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProper}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-br', {style:'currency', currency:'BRL'}).format(incident.value)}</Text>

                <TouchableOpacity 
                style={styles.detailsButton} 
                    onPress={() => navigationDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes...</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
            )}
            />
            
        </View>
    );
}

//pronto ve ai
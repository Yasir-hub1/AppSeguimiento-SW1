import React, {
    useState,
    useEffect
} from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { listaRutas } from '../../Services/AuthService';

const Rutas = ({navigation}) => {
    const [obtenerRutas, setobtenerRutas] = useState([])
    const [dataRuta, setDataRuta] = useState(null);


    async function obtenerListaDeRutas() {
        const listRutas = await listaRutas();
        setobtenerRutas(listRutas);


    }
    useEffect(() => {
        obtenerListaDeRutas();
    }, [])

    const [checkRuta, setcheckRuta] = useState(null);

    const toggleCheckBox = (item) => {
        if (checkRuta === item.id) {
            // Si el mismo checkbox está seleccionado, deseleccionarlo
            setcheckRuta(null);
        } else {
            // Si se selecciona un nuevo checkbox, deseleccionar el anterior y seleccionar el nuevo
            setcheckRuta(item.id);
        }
    };

    console.log("checkRuta ", checkRuta)


    const renderClassItem = ({ item }) => (
        <View style={styles.classItem}>
            <View style={styles.classContent}>
                <View style={[styles.card, { backgroundColor: "#FAFAD2" }]}>
                    <Text style={[styles.cardTitle, { fontWeight: "800" }]}>{item.nombreRuta}</Text>
                    <Text style={styles.cardBody}>Horarios: {item.hora_inicio} - {item.hora_fin}</Text>
                    <Text style={styles.cardBody}>Dias: {item.dia_semana}</Text>
                    <Text style={styles.cardBody}>Distrito: {item.nombreDistrito}</Text>
                    <Text style={styles.cardBody}>Zona: {item.nombreZona}</Text>

                    <CheckBox
                        checked={checkRuta === item.id}
                        onPress={() => {toggleCheckBox(item);setDataRuta(item)}}
                        center={true}
                    />

                </View>
            </View>
        </View>
    );

    renderItemSeparator = ({ item }) => (
        <View style={styles.separatorContainer}>
            <View style={styles.timelineLine}></View>
            
        </View>
    )

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Rutas</Text>

                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    ItemSeparatorComponent={renderItemSeparator}
                    data={obtenerRutas}
                    renderItem={renderClassItem}
                    keyExtractor={(item, index) => index.toString()}
                />

                <Button

                    title="Enviar"
                    buttonStyle={{ backgroundColor: "#00b894", alignSelf: "center", width: "80%", height: 50, bottom: 10 }}
                    onPress={()=>navigation.navigate("Mapa",{id_ruta:checkRuta,dataRuta:dataRuta})}
                />
            </View>



        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor:"#fff"

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        color:"#00b894"
    },
    card: {
        flex: 1,
        backgroundColor: '#ff7f50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        padding: 16,


    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },


    classItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    separatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timelineLine: {
        flex: 1,
        width: 8,
        height: 60,
        backgroundColor: '#00b894',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,

    },
    classContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },


    cardTitle: {
        fontSize: 16,
        color: '#00008B',
        marginBottom: 4,
    },
    cardBody: {
        fontSize: 12,
        color: '#00008B',
        marginBottom: 8,
        left: 8
    },
    studentListContainer: {
        marginRight: 10,
    },
    studentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: -3,
        borderWidth: 1,
        borderColor: '#fff'
    },
});

export default Rutas;
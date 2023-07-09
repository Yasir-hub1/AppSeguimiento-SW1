
import { listaEmpleados } from '../../Services/AuthService'
import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from 'react-native'
import { Button, CheckBox } from 'react-native-elements';

const ListaDeEmpleados = ({ setEmpleadosSeleccionados }) => {
  const [obtenerEmpleado, setObtenerEmpleado] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);


  const toggleCheckBox = (item) => {
    const updatedItems = [...checkedItems];
    const foundItem = updatedItems.find((checkedItem) => checkedItem.id === item.id);
    if (foundItem) {
      foundItem.isChecked = !foundItem.isChecked;
    } else {
      updatedItems.push({ id: item.id, isChecked: true });
    }
    setCheckedItems(updatedItems);
  };

  console.log("seleccionados ", checkedItems)
  async function listarEmpleados() {
    try {
      const listEmpleado = await listaEmpleados();
      const empleadosConChecked = listEmpleado.map((empleado) => ({ ...empleado, isChecked: false }));
      setObtenerEmpleado(empleadosConChecked);
      // console.log("FRONT ", empleadosConChecked);
    } catch (error) {
      console.log("ERR FRON ", error);
    }
  }

  const onbtenerEmpleadosSeleccionados = () => {

    const checkboxesSeleccionados = checkedItems
      .filter((item) => item.isChecked)
      .map((item) => item.id);
    // Hacer la solicitud HTTP a la API con los IDs de los checkboxes seleccionados
    setEmpleadosSeleccionados(checkboxesSeleccionados);
    console.log('IDs de checkboxes', checkboxesSeleccionados);

  };



  useEffect(() => {
    listarEmpleados()
  }, [])


  return (
    <View style={[styles.container]}>

      <FlatList
        style={styles.notificationList}
        data={obtenerEmpleado}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ alignSelf: "flex-end", top: 35, zIndex: 170, right: 10 }}>
                {item.roles.map(item => (
                  <Text key={item.id} style={{ color: "#fff" }}>{item.name}</Text>
                ))}

              </View>

              <TouchableOpacity
                style={[styles.card, { borderColor: "#00b894" }]}
              >

                <View style={styles.cardContent}>



                  <Image style={[styles.image, styles.imageContent]} source={{ uri: item.image }} />

                  <Text style={styles.name}>{item.name} {item.apellidos}</Text>
                  <CheckBox
                    checked={checkedItems.find((checkedItem) => checkedItem.id === item.id)?.isChecked}
                    onPress={() => toggleCheckBox(item)}
                  />


                </View>

                <View style={[styles.tagsContent, { left: 15 }]}>
                  <Text>CI: {item.ci}</Text>
                  <Text>Celular: {item.phone}</Text>

                </View>

              </TouchableOpacity>

            </>
          )
        }}
      />
      {checkedItems && checkedItems.length>0?
      (
      <View style={{ alignSelf: "center", width: "80%", bottom: 10 }}>
        <Button
          title="Guardar Equipo"
          onPress={onbtenerEmpleadosSeleccionados}
          buttonStyle={{backgroundColor:"#00b894"}}
        />

      </View>

      )
      :null}
    </View>
  )
}

export default ListaDeEmpleados

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    paddingVertical: 10,

  },
  formContent: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    bottom: 10,

    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 10,
    borderRadius: 10
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    // flexWrap: 'nowrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
})
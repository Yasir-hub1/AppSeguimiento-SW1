import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../Screen/Chofer/Inicio";
import Mapa from "../../Screen/Chofer/Mapa";
import Rutas from "../../Screen/Chofer/Rutas";


const ChoferStacks = createNativeStackNavigator();

const ChoferStack = () => {
	return (
		<ChoferStacks.Navigator initialRouteName="Inicio">

			<ChoferStacks.Screen
				name="Inicio"
				component={Inicio}
				options={{
					headerShown: true,
					headerTitle: "Bienvenido",
					headerBackVisible: false,
				}}
			/>
			<ChoferStacks.Screen
				name="Rutas"
				component={Rutas}
				options={{ headerShown: false, headerTitle: "Rutas", headerBackVisible: false }}
			/>
			<ChoferStacks.Screen
				name="Mapa"
				component={Mapa}
				options={{ headerShown:false, headerTitle: "Ruta", headerBackVisible: false }}
			/>
		</ChoferStacks.Navigator>
	);
};

export default ChoferStack;

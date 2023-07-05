import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../Screen/Chofer/Inicio";
import Mapa from "../../Screen/Chofer/Mapa";


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
				name="Mapa"
				component={Mapa}
				options={{ headerShown: true, headerTitle: "Ruta" }}
			/>
		</ChoferStacks.Navigator>
	);
};

export default ChoferStack;

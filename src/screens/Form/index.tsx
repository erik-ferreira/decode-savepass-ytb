import React, { useState } from "react";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { HeaderForm } from "../../components/HeaderForm";

export function Form() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function handleNew() {
    try {
      const id = uuid.v4();
      const newData = {
        id,
        name,
        user,
        password,
      };

      await AsyncStorage.setItem(
        "@savepass:passwords",
        JSON.stringify(newData)
      );
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!",
      });
    } catch (err) {
      console.log(err);

      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar!",
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>
          <HeaderForm />

          <View style={styles.form}>
            <Input label="Nome do serviço" onChangeText={setName} />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
            />
            <Input label="Senha" secureTextEntry onChangeText={setPassword} />
          </View>

          <View style={styles.footer}>
            <Button title="Salvar" onPress={handleNew} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

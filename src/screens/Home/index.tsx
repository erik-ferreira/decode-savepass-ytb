import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Button";
import { Card, CardProps } from "../../components/Card";
import { HeaderHome } from "../../components/HeaderHome";

import { styles } from "./styles";

export function Home() {
  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");

  const [data, setData] = useState<CardProps[]>([]);

  async function handleFetchData() {
    const response = await getItem();
    const dataConvert = response ? JSON.parse(response) : [];

    setData(dataConvert);
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];

    const dataFiltered = previousData?.filter(
      (item: CardProps) => item.id !== id
    );
    setItem(JSON.stringify(dataFiltered));
    setData(dataFiltered);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>Suas senhas</Text>

        <Text style={styles.listCount}>{`${data.length} ao total`}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handleRemove(item.id)} />
        )}
      />

      <View style={styles.footer}>
        <Button title="Limpar lista" />
      </View>
    </View>
  );
}

import { StyleSheet, View } from 'react-native';
import Home from './components/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';

const initializeDb = async (db: any) => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        date TEXT,
        body TEXT
      );`
    );
    console.log("database connected");
  } catch (error) {
    console.log("An error occured in connecting the database ", error);
  }
}

export default function App() {
  return (
    <SQLiteProvider databaseName='FNotes.db' onInit={initializeDb}>
      <View style={styles.container}>
        <SafeAreaView>
          <Home />
        </SafeAreaView>
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#49295c',
    opacity: 0.8,
    flex: 1
    // height: Dimensions.get("window").height * 2
  },
});

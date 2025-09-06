import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const saveEntry = async () => {
    if (!newEntry.trim()) {
      Alert.alert('Error', 'Por favor escribe algo en tu entrada');
      return;
    }

    const entry = {
      id: Date.now().toString(),
      text: newEntry.trim(),
      date: new Date().toISOString(),
      mood: 'happy', // Por ahora fijo, se puede expandir
    };

    try {
      const updatedEntries = [entry, ...entries];
      setEntries(updatedEntries);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setNewEntry('');
      setIsAddingEntry(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la entrada');
    }
  };

  const deleteEntry = async (id) => {
    Alert.alert(
      'Eliminar entrada',
      '¿Estás seguro de que quieres eliminar esta entrada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedEntries = entries.filter(entry => entry.id !== id);
              setEntries(updatedEntries);
              await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la entrada');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: 'happy',
      sad: 'sad',
      excited: 'flash',
      calm: 'leaf',
    };
    return icons[mood] || 'happy';
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: '#FFEAA7',
      sad: '#DDA0DD',
      excited: '#FF6B9D',
      calm: '#96CEB4',
    };
    return colors[mood] || '#FFEAA7';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#96CEB4', '#85C1A3']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="book" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Diario</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {!isAddingEntry && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddingEntry(true)}
          >
            <Ionicons name="add" size={24} color="#96CEB4" />
            <Text style={styles.addButtonText}>Nueva Entrada</Text>
          </TouchableOpacity>
        )}

        {isAddingEntry && (
          <View style={styles.newEntryContainer}>
            <Text style={styles.newEntryTitle}>¿Cómo está tu gato hoy?</Text>
            <TextInput
              style={styles.textInput}
              value={newEntry}
              onChangeText={setNewEntry}
              placeholder="Escribe sobre el comportamiento, salud, o cualquier observación..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <View style={styles.newEntryActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsAddingEntry(false);
                  setNewEntry('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveEntry}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.entriesList}>
          {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={60} color="#8E8E93" />
              <Text style={styles.emptyStateText}>
                No hay entradas aún
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Comienza escribiendo sobre tu gato
              </Text>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <View style={[
                    styles.moodIcon,
                    { backgroundColor: getMoodColor(entry.mood) }
                  ]}>
                    <Ionicons 
                      name={getMoodIcon(entry.mood)} 
                      size={16} 
                      color="#fff" 
                    />
                  </View>
                  <Text style={styles.entryDate}>
                    {formatDate(entry.date)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => deleteEntry(entry.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={16} color="#8E8E93" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.entryText}>{entry.text}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#96CEB4',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#96CEB4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  newEntryContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newEntryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    marginBottom: 15,
    minHeight: 120,
  },
  newEntryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#96CEB4',
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  entriesList: {
    marginBottom: 20,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  moodIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  entryDate: {
    flex: 1,
    fontSize: 14,
    color: '#7F8C8D',
  },
  deleteButton: {
    padding: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

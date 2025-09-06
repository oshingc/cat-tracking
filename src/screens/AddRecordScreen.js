import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecordScreen({ route, navigation }) {
  const { category } = route.params;
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    weight: '',
    vetName: '',
    medication: '',
    foodType: '',
    amount: '',
  });

  const categoryConfig = {
    weight: {
      title: 'Registrar Peso',
      icon: 'fitness',
      color: '#FF6B9D',
      fields: ['weight', 'notes']
    },
    vaccine: {
      title: 'Registrar Vacuna',
      icon: 'medical',
      color: '#4ECDC4',
      fields: ['medication', 'vetName', 'notes']
    },
    flea: {
      title: 'Registrar Antipulgas',
      icon: 'bug',
      color: '#45B7D1',
      fields: ['medication', 'notes']
    },
    vet: {
      title: 'Visita al Veterinario',
      icon: 'medical-outline',
      color: '#96CEB4',
      fields: ['vetName', 'notes']
    },
    diet: {
      title: 'Registro de Dieta',
      icon: 'restaurant',
      color: '#FFEAA7',
      fields: ['foodType', 'amount', 'notes']
    },
    documents: {
      title: 'Agregar Documento',
      icon: 'document-text',
      color: '#DDA0DD',
      fields: ['notes']
    }
  };

  const config = categoryConfig[category];

  const handleSave = async () => {
    try {
      const record = {
        id: Date.now().toString(),
        category,
        date: formData.date,
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const existingRecords = await AsyncStorage.getItem('catRecords');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(record);
      
      await AsyncStorage.setItem('catRecords', JSON.stringify(records));
      
      Alert.alert(
        '¡Éxito!',
        'Registro guardado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro');
    }
  };

  const renderField = (field) => {
    const fieldConfig = {
      weight: { label: 'Peso (kg)', placeholder: 'Ej: 3.5', keyboardType: 'numeric' },
      notes: { label: 'Notas', placeholder: 'Información adicional...', multiline: true },
      vetName: { label: 'Veterinario', placeholder: 'Nombre del veterinario' },
      medication: { label: 'Medicamento', placeholder: 'Nombre del medicamento' },
      foodType: { label: 'Tipo de comida', placeholder: 'Ej: Pienso premium' },
      amount: { label: 'Cantidad', placeholder: 'Ej: 50g' },
    };

    const fieldInfo = fieldConfig[field];
    if (!fieldInfo) return null;

    return (
      <View key={field} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{fieldInfo.label}</Text>
        <TextInput
          style={[
            styles.input,
            fieldInfo.multiline && styles.multilineInput
          ]}
          value={formData[field]}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          placeholder={fieldInfo.placeholder}
          keyboardType={fieldInfo.keyboardType || 'default'}
          multiline={fieldInfo.multiline}
          numberOfLines={fieldInfo.multiline ? 4 : 1}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[config.color, config.color + '80']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name={config.icon} size={30} color="#fff" />
          <Text style={styles.headerTitle}>{config.title}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              placeholder="YYYY-MM-DD"
            />
          </View>

          {config.fields.map(renderField)}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: config.color }]}
          onPress={handleSave}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

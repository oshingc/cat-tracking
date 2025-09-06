import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [catProfile, setCatProfile] = useState({
    name: 'Luna',
    breed: 'Gato doméstico',
    birthDate: '2020-05-15',
    weight: '3.5',
    color: 'Negro y blanco',
    gender: 'Hembra',
    microchip: '',
    vetName: '',
    vetPhone: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('catProfile');
      if (savedProfile) {
        setCatProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('catProfile', JSON.stringify(catProfile));
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil');
    }
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderField = (label, value, field, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={catProfile[field]}
          onChangeText={(text) => setCatProfile({ ...catProfile, [field]: text })}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#DDA0DD', '#C39BD3']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="paw" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="paw" size={40} color="#DDA0DD" />
            </View>
            <View style={styles.basicInfo}>
              <Text style={styles.catName}>{catProfile.name}</Text>
              <Text style={styles.catAge}>
                {calculateAge(catProfile.birthDate)} años
              </Text>
              <Text style={styles.catBreed}>{catProfile.breed}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons 
              name={isEditing ? "close" : "create"} 
              size={20} 
              color="#DDA0DD" 
            />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancelar' : 'Editar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          
          {renderField('Nombre', catProfile.name, 'name')}
          {renderField('Raza', catProfile.breed, 'breed')}
          {renderField('Fecha de nacimiento', formatDate(catProfile.birthDate), 'birthDate')}
          {renderField('Peso actual (kg)', catProfile.weight, 'weight')}
          {renderField('Color', catProfile.color, 'color')}
          {renderField('Sexo', catProfile.gender, 'gender')}
          {renderField('Microchip', catProfile.microchip || 'No registrado', 'microchip')}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información Veterinaria</Text>
          
          {renderField('Veterinario', catProfile.vetName || 'No especificado', 'vetName')}
          {renderField('Teléfono del veterinario', catProfile.vetPhone || 'No especificado', 'vetPhone')}
        </View>

        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveProfile}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        )}

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="fitness" size={24} color="#DDA0DD" />
              <Text style={styles.statNumber}>{catProfile.weight}kg</Text>
              <Text style={styles.statLabel}>Peso actual</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={24} color="#DDA0DD" />
              <Text style={styles.statNumber}>{calculateAge(catProfile.birthDate)}</Text>
              <Text style={styles.statLabel}>Años</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="medical" size={24} color="#DDA0DD" />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Vacunas</Text>
            </View>
          </View>
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
  profileCard: {
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
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  basicInfo: {
    flex: 1,
  },
  catName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  catAge: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  catBreed: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DDA0DD',
  },
  editButtonText: {
    color: '#DDA0DD',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  multilineInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDA0DD',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
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
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 8,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrackingScreen({ navigation }) {
  const [catName, setCatName] = useState('Luna');

  const trackingCategories = [
    {
      id: 'weight',
      title: 'Peso',
      icon: 'fitness',
      color: '#FF6B9D',
      description: 'Registra el peso de tu gato'
    },
    {
      id: 'vaccine',
      title: 'Vacunas',
      icon: 'medical',
      color: '#4ECDC4',
      description: 'Control de vacunas'
    },
    {
      id: 'flea',
      title: 'Antipulgas',
      icon: 'bug',
      color: '#45B7D1',
      description: 'Tratamientos antipulgas'
    },
    {
      id: 'vet',
      title: 'Veterinario',
      icon: 'medical-outline',
      color: '#96CEB4',
      description: 'Visitas al veterinario'
    },
    {
      id: 'diet',
      title: 'Dieta',
      icon: 'restaurant',
      color: '#FFEAA7',
      description: 'Registro de alimentación'
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: 'document-text',
      color: '#DDA0DD',
      description: 'Certificados y documentos'
    }
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('AddRecord', { category });
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { backgroundColor: category.color }]}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={category.icon} size={28} color="#fff" />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#FF8E9B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="paw" size={24} color="#FF6B9D" />
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.catName}>{catName}</Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="mail" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="settings" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Registros de {catName}</Text>
        
        <View style={styles.categoriesGrid}>
          {trackingCategories.slice(0, 2).map(renderCategoryCard)}
        </View>
        
        <View style={styles.categoriesGrid}>
          {trackingCategories.slice(2, 4).map(renderCategoryCard)}
        </View>
        
        <View style={styles.fullWidthCard}>
          {renderCategoryCard(trackingCategories[4])}
        </View>
        
        <View style={styles.categoriesGrid}>
          {trackingCategories.slice(5).map(renderCategoryCard)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullWidthCard: {
    marginBottom: 15,
  },
  categoryIcon: {
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
});

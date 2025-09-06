import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const quickActions = [
    { title: 'Agregar Peso', icon: 'fitness', color: '#FF6B9D', category: 'weight' },
    { title: 'Vacuna', icon: 'medical', color: '#4ECDC4', category: 'vaccine' },
    { title: 'Antipulgas', icon: 'bug', color: '#45B7D1', category: 'flea' },
    { title: 'Veterinario', icon: 'medical-outline', color: '#96CEB4', category: 'vet' },
    { title: 'Dieta', icon: 'restaurant', color: '#FFEAA7', category: 'diet' },
  ];

  const handleQuickAction = (category) => {
    navigation.navigate('Tracking', {
      screen: 'AddRecord',
      params: { category }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#FF8E9B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="paw" size={30} color="#FF6B9D" />
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.greeting}>¡Hola! 👋</Text>
              <Text style={styles.subtitle}>Mantén la salud de tu gato al día</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: action.color }]}
              onPress={() => handleQuickAction(action.category)}
            >
              <Ionicons name={action.icon} size={24} color="#fff" />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Resumen de la Semana</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="fitness" size={20} color="#FF6B9D" />
              <Text style={styles.statNumber}>2.5kg</Text>
              <Text style={styles.statLabel}>Peso actual</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="medical" size={20} color="#4ECDC4" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Vacunas</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={20} color="#45B7D1" />
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Próxima cita</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: '48%',
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  statsSection: {
    marginTop: 10,
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
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
});

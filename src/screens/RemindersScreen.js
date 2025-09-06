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

export default function RemindersScreen() {
  const [reminders, setReminders] = useState([
    {
      id: '1',
      title: 'Vacuna anual',
      date: '2024-03-15',
      type: 'vaccine',
      completed: false,
    },
    {
      id: '2',
      title: 'Antipulgas mensual',
      date: '2024-02-20',
      type: 'flea',
      completed: false,
    },
    {
      id: '3',
      title: 'Control de peso',
      date: '2024-02-10',
      type: 'weight',
      completed: true,
    },
  ]);

  const getTypeIcon = (type) => {
    const icons = {
      vaccine: 'medical',
      flea: 'bug',
      weight: 'fitness',
      vet: 'medical-outline',
      diet: 'restaurant',
    };
    return icons[type] || 'calendar';
  };

  const getTypeColor = (type) => {
    const colors = {
      vaccine: '#4ECDC4',
      flea: '#45B7D1',
      weight: '#FF6B9D',
      vet: '#96CEB4',
      diet: '#FFEAA7',
    };
    return colors[type] || '#8E8E93';
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const addReminder = () => {
    Alert.alert(
      'Nuevo Recordatorio',
      'Esta funcionalidad estará disponible próximamente',
      [{ text: 'OK' }]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="calendar" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Recordatorios</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addReminder}
        >
          <Ionicons name="add" size={24} color="#4ECDC4" />
          <Text style={styles.addButtonText}>Agregar Recordatorio</Text>
        </TouchableOpacity>

        <View style={styles.remindersList}>
          {reminders.map((reminder) => (
            <TouchableOpacity
              key={reminder.id}
              style={[
                styles.reminderCard,
                reminder.completed && styles.completedCard
              ]}
              onPress={() => toggleReminder(reminder.id)}
            >
              <View style={styles.reminderLeft}>
                <View style={[
                  styles.typeIcon,
                  { backgroundColor: getTypeColor(reminder.type) }
                ]}>
                  <Ionicons 
                    name={getTypeIcon(reminder.type)} 
                    size={20} 
                    color="#fff" 
                  />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={[
                    styles.reminderTitle,
                    reminder.completed && styles.completedText
                  ]}>
                    {reminder.title}
                  </Text>
                  <Text style={styles.reminderDate}>
                    {formatDate(reminder.date)}
                  </Text>
                </View>
              </View>
              <View style={styles.reminderRight}>
                {reminder.completed ? (
                  <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#8E8E93" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {reminders.filter(r => r.completed).length}
              </Text>
              <Text style={styles.statLabel}>Completados</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {reminders.filter(r => !r.completed).length}
              </Text>
              <Text style={styles.statLabel}>Pendientes</Text>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  remindersList: {
    marginBottom: 30,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.6,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  reminderDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  reminderRight: {
    marginLeft: 10,
  },
  statsSection: {
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Colors } from '../utils/colors';

interface HomeCardSectionProps {
  heading: string;
  data: { id: string; imageUrl: string; heading: string }[];
}

const HomeCardSection: React.FC<HomeCardSectionProps> = ({ heading, data }) => {

  return (
    <View style={styles.cardSection}>
        <Text style={styles.cardSectionHeading}>{heading}</Text>
        <FlatList
      data={data}
      horizontal={true}
      renderItem={({ item }) => <View style={styles.imageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.imageContainerImage} />
      <Text style={styles.imageContainerText}>{item.heading}</Text>
    </View>}
      keyExtractor={(item) => item.id}
    />
      </View>
  );
};

const styles = StyleSheet.create({
    cardSection: {
        marginTop: 20
      },
    
      cardSectionHeading: {
        fontSize: 20,
        color: Colors.tertiary,
        fontWeight: '600',
      },
    
      imageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 10,
      },
      imageContainerImage: {
        width: 200,
        height: 250,
        borderRadius: 20,
        marginRight: 10,
        overflow: 'hidden',
      },
      imageContainerText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        fontSize: 16,
      },
});

export default HomeCardSection;

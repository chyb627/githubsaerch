import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from './Typography';

const RepoCard: React.FC<{ fullname: string; description: string }> = ({
  fullname,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Typography fontSize={16} color="darkmagenta" numberOfLines={1}>
        <Text style={styles.repoNameText}>RepoName : </Text>
        {fullname}
      </Typography>

      <View style={styles.separat} />

      <Typography fontSize={16} color="maroon" numberOfLines={2}>
        <Text style={styles.descriptionText}>Description : </Text>
        {description}
      </Typography>
    </View>
  );
};

export default RepoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  repoNameText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  separat: {
    marginVertical: 4,
  },
  descriptionText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});

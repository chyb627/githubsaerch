import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const IssueCard: React.FC<{
  issueNum: number;
  issueTitle: string;
  issueWriter: string;
  issueDate: string;
  issuecomments: number;
}> = ({ issueNum, issueTitle, issueWriter, issueDate, issuecomments }) => {
  const writeDate = dayjs(issueDate).format('YYYY년 MM월 DD일');

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.leftItem}>
          <Text style={styles.leftTitleText}>{`#${issueNum} ${issueTitle}`}</Text>
          <Text
            style={styles.leftWriterText}>{`작성자: ${issueWriter}, 작성일: ${writeDate}`}</Text>
        </View>

        <View style={styles.rightItem}>
          <Text style={styles.rightCommentsText}>{`코멘트: ${issuecomments}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default IssueCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  leftItem: {
    flex: 3,
  },
  leftTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  leftWriterText: {
    fontSize: 12,
  },
  rightItem: {
    flex: 1,
    justifyContent: 'center',
  },
  rightCommentsText: {
    textAlign: 'right',
  },
});

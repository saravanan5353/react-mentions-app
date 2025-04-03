import { MentionsInput, Mention } from 'react-mentions';
import { Box, Text, VStack, Image } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/mentions.css';

interface MentionItem {
  id: string | number;
  display: string;
}

// Sample data for mentions
const users: MentionItem[] = [
  { id: '1', display: 'John Doe' },
  { id: '2', display: 'Jane Smith' },
  { id: '3', display: 'Mike Johnson' },
  { id: '4', display: 'Sarah Williams' },
];

const CustomMentionsInput = () => {
  const [value, setValue] = useState('');
  const [plainText, setPlainText] = useState('');

  const handleChange = (event: any, newValue: string, newPlainTextValue: string, mentions: any[]) => {
    setValue(newValue);
    setPlainText(newPlainTextValue);
    console.log('Value with markup:', newValue);
    console.log('Plain text with mentions:', newPlainTextValue);
    console.log('Mentions:', mentions);
  };

  return (
    <VStack spacing={4} width="100%" maxW="600px" mx="auto" p={4}>
      <Box textAlign="center">
        <Image
          src="https://i.pinimg.com/736x/cf/c1/fe/cfc1febff66b91a8516af7c4054a0c4a.jpg"
          alt="Home Page Image"
          boxSize="400px"
          objectFit="cover"
          borderRadius="md"
          mb={4}
        />
        <Text fontSize="xl" fontWeight="bold">Mentions Demo</Text>
      </Box>
      <Box width="100%">
        <MentionsInput
          value={value}
          onChange={handleChange}
          markup="#{{__type__||__id__||__display__}}#"
          className="mentions"
          placeholder="Type anything, use the @ symbol to tag other users."
          allowSpaceInQuery
          allowSuggestionsAboveCursor
          a11ySuggestionsListLabel="Suggested mentions"
        >
          <Mention
            type="user"
            trigger="@"
            data={users}
            className="mentions__mention"
          />
        </MentionsInput>
      </Box>
      <Box width="100%" p={4} bg="gray.50" borderRadius="md">
        <Text fontWeight="bold">Plain Text Output:</Text>
        <Text>{plainText}</Text>
      </Box>
    </VStack>
  );
};

export default CustomMentionsInput; 
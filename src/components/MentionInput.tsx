import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  Input,
  VStack,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
  username: string;
}

const MentionInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample users data - in a real app, this would come from an API
  const users: User[] = [
    { id: 1, name: 'John Doe', username: 'johndoe' },
    { id: 2, name: 'Jane Smith', username: 'janesmith' },
    { id: 3, name: 'Mike Johnson', username: 'mikej' },
    { id: 4, name: 'Sarah Wilson', username: 'sarahw' },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart;
    setInputValue(value);
    setCursorPosition(position || 0);

    // Check if we're in a mention context
    const lastAtSymbol = value.lastIndexOf('@', position || 0);
    const nextSpace = value.indexOf(' ', position || 0);
    const mentionText = value.slice(lastAtSymbol + 1, nextSpace === -1 ? undefined : nextSpace);

    if (lastAtSymbol !== -1 && mentionText) {
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        break;
      case 'Enter':
        e.preventDefault();
        insertMention(filteredUsers[selectedIndex]);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const insertMention = (user: User) => {
    const lastAtSymbol = inputValue.lastIndexOf('@', cursorPosition);
    const nextSpace = inputValue.indexOf(' ', cursorPosition);
    
    const newValue = 
      inputValue.slice(0, lastAtSymbol) +
      `@${user.username} ` +
      (nextSpace === -1 ? '' : inputValue.slice(nextSpace + 1));
    
    setInputValue(newValue);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(
      inputValue.slice(inputValue.lastIndexOf('@') + 1).toLowerCase()
    )
  );

  return (
    <Box position="relative" width="100%" maxWidth="600px" mx="auto">
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type @ to mention someone..."
        size="lg"
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px blue.500',
        }}
      />
      
      {showSuggestions && filteredUsers.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="white"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="lg"
          zIndex="1000"
          mt={2}
        >
          <Box as="ul" listStyleType="none" m={0} p={0}>
            {filteredUsers.map((user, index) => (
              <Box
                as="li"
                key={user.id}
                cursor="pointer"
                bg={index === selectedIndex ? 'blue.50' : 'transparent'}
                _hover={{ bg: 'blue.50' }}
                onClick={() => insertMention(user)}
                p={2}
              >
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">{user.name}</Text>
                  <Text fontSize="sm" color="gray.500">@{user.username}</Text>
                </VStack>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MentionInput;
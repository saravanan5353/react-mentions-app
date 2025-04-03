import { Container } from '@chakra-ui/react'
import CustomMentionsInput from './components/MentionsInput'

function App() {
  return (
    <Container maxW="container.xl" py={8}>
      <CustomMentionsInput />
    </Container>
  )
}

export default App
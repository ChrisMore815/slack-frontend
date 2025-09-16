import React from 'react';
import { Box, Wrap, Flex } from '@chakra-ui/react';
import { emoticons } from '../constants/emoticons';

const Emoticons = () => {
    return <Wrap minW={"100%"} h={"100px"} overflowY={"auto"} >
        {emoticons.map((value, index) => {
            return <Box p={0.5} key={index} id={value.id}>
                {value.icon}
            </Box>
        })}
    </Wrap>
}

export default Emoticons;
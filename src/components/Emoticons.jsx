import React from 'react';
import { Box, Wrap, Flex } from '@chakra-ui/react';
import { emoticons } from '../constants/emoticons';

const Emoticons = (props) => {
    return <Wrap minW={"100%"} h={"100px"} overflowY={"auto"} >
        {emoticons.map((value, index) => {
            return <Box cursor={"pointer"} p={0.5} key={index} id={value.id} bg={props.msg.emoticons.includes(value.icon) ? "#ddd" : "none"} onClick={() => props.handleRecommend(value.icon)}>
                {value.icon}
            </Box>
        })}
    </Wrap>
}

export default Emoticons;
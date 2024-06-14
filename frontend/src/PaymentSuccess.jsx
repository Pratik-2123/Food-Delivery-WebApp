import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from 'react'

const PaymentSuccess = () => {
    
    return (
        <Box>
            <VStack h="40vh" justifyContent={"center"}>

                <Heading textTransform={"uppercase"}> Order Successfull</Heading>
                <Heading textTransform={"uppercase"} color={"#ff6347"}> Visit soon</Heading>

            </VStack>
        </Box>
    )
}

export default PaymentSuccess

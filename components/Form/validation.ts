import { isAddress } from "viem"

export const isValidJSON = (value: string) => {
    try {
        JSON.parse(value)
        return true
    } catch (e) {
        return 'Please enter a valid contract ABI'
    }
}

export const isValidEthereumAddress = (value: string) => isAddress(value) || 'Please enter a valid contract address'

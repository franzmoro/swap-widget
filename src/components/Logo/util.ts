import { SupportedChainId } from 'constants/chains'
import { isAddress } from 'utils'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import BaseLogo from '../../assets/svg/base_logo.svg'
import BnbLogo from '../../assets/svg/bnb-logo.svg'
import CeloLogo from '../../assets/svg/celo_logo.svg'
import MaticLogo from '../../assets/svg/matic-token-icon.svg'
import { LogoTableInput } from './LogoTable'

type Network = 'ethereum' | 'arbitrum' | 'optimism' | 'polygon' | 'celo' | 'smartchain' | 'base'

function chainIdToNetworkName(networkId: SupportedChainId): Network | undefined {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case SupportedChainId.OPTIMISM:
      return 'optimism'
    case SupportedChainId.POLYGON:
      return 'polygon'
    case SupportedChainId.CELO:
      return 'celo'
    case SupportedChainId.BNB:
      return 'smartchain'
    case SupportedChainId.BASE:
      return 'base'
    default:
      return 'ethereum'
  }
}

export function getAssetsRepoURI(asset: LogoTableInput): string | undefined {
  const networkName = chainIdToNetworkName(asset.chainId)
  if (!networkName) return

  if (asset.isNative)
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/info/logo.png`

  const checksummedAddress = isAddress(asset.address)
  return checksummedAddress
    ? `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${checksummedAddress}/logo.png`
    : undefined
}

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.BASE): string {
  switch (chainId) {
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return MaticLogo
    case SupportedChainId.CELO:
    case SupportedChainId.CELO_ALFAJORES:
      return CeloLogo
    case SupportedChainId.BNB:
      return BnbLogo
    case SupportedChainId.BASE:
      return BaseLogo
    default:
      return EthereumLogo
  }
}

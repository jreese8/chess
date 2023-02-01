import { piecesImages } from '../config/piecesImages.config.js'
import { initialGame } from '../config/initialGame.config.js'
import { potentialGame } from '../config/potentialGame.config.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { piecesHandle } from '../services/piecesHandle.service.js'
import { piecesDetermine } from '../services/piecesDetermine.service.js'

export const piecesRender = {
    piecesEventListeners: {},

    //facade pattern
    renderPieces() {
        const gameSetup = chessConfig.useInitialGame ? initialGame : potentialGame

        this.placePieceBoxNumbers()
        this.placePiecesInPosition( gameSetup )
        this.addPiecesBoxListeners()
        this.piecesDetermine()
    },
    placePieceBoxNumbers() {
        document.querySelectorAll( chessConfig.chessPieceBoxSelector ).map( pieceBoxElement => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'piece-box-text' )
            spanElement.innerHTML = pieceBoxElement.getAttribute( 'id' )
            
            pieceBoxElement.append( spanElement )
        })
    },
    placePiecesInPosition( gameSetup ) {
        for ( const piecePosition in gameSetup ) {
            const pieceType = gameSetup[ piecePosition ]
            const pieceImageLocation = piecesImages[ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `${ pieceImageLocation }`

            document.querySelector( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        document.querySelectorAll( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            const pieceElement = element.querySelector( pieceBoxElement, chessConfig.chessPieceSelector )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null

            const handleParams = {
                pieceBoxElement,
                pieceBoxPosition,
                pieceElement,
                pieceType
            }

            this.piecesEventListeners[ pieceBoxPosition ] = {
                'mouseenter': _ => {
                    piecesHandle.handlePieceMouseenter( handleParams )
                },
                'mouseleave': _ => {
                    piecesHandle.handlePieceMouseleave( handleParams )
                },
                'click': _ => {
                    piecesHandle.handlePieceClick( handleParams )
                },
            }

            pieceBoxElement.addEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.addEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.addEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    resetPiecesBoxListeners() {
        document.querySelectorAll( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )

            pieceBoxElement.removeEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.removeEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.removeEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    piecesDetermine() {
        piecesDetermine.generateDeterminations()
    },

    getCurrentGameSetup() {
        return document.querySelectorAll( chessConfig.chessPieceSelector ).
            map( pieceElement => ({
                pieceType: pieceElement.getAttribute( 'piece-type' ),
                piecePosition: pieceElement.closest( chessConfig.chessPieceBoxSelector ).getAttribute( 'id' )
            })).
            reduce( (obj, { pieceType, piecePosition } ) => {
                obj[ piecePosition ] = pieceType
                return obj
            }, {})
    }
}

window.piecesRender = piecesRender
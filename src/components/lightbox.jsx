import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Img from 'gatsby-image';

import {
    CloseIcon,
    ArrowIcon
} from './icons';

import styles from './lightbox.module.scss';

//
// MODAL
//
class Modal extends Component {
  constructor(props) {
    super(props);

    this.element = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.element,
    );
  }
}

//
// LIGHTBOX
//
class LightBox extends Component {
    contentRef = React.createRef()

    state = {
        style: {
            width: '100%',
            height: '100%'
        }
    }

    _calculateState = () => {
        const { current } = this.contentRef;
        const { photo } = this.props;
        if (!current || !photo) {
            return;
        }

        const { offsetHeight, offsetWidth } = current;
        const {
            fluid: {
                aspectRatio,
                presentationWidth,
                presentationHeight
            }
        } = photo;

        const style = aspectRatio >= 1
            ? {
                // landscape photos
                maxWidth: Math.min(offsetWidth, presentationWidth),
                maxHeight: Math.min(offsetWidth / aspectRatio, offsetHeight, presentationHeight)
            }
            : {
                // portrait photos
                maxWidth: Math.min(offsetHeight * aspectRatio, offsetWidth, presentationWidth),
                maxHeight: Math.min(offsetHeight, presentationHeight)
            };

        this.setState({ style });
    }

    _handleKeydown = (event) => {
        switch (event.keyCode) {
            case 27: {
                this.props.onClose(event);
                break;
            }
            
            case 37: {
                this.props.onPrev(event);
                break;
            }

            case 39: {
                this.props.onNext(event);
                break;
            }

            default:
        }
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this._handleKeydown);
        window.addEventListener('resize', this._calculateState);
        this._calculateState();
    }

    componentDidUpdate = ({ photo: prevPhoto }) => {
        if (prevPhoto === this.props.photo) {
            return;
        }
        
        this._calculateState();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeydown);
        window.removeEventListener('resize', this._calculateState);
    }

    render() {
        const {
            props: {
                photo,
                onNext,
                onPrev,
                onClose,
                hasNext,
                hasPrev
            },
            state: {
                style
            }
        } = this;

        return photo && (
            <Modal>
                <div
                    role='button'
                    tabIndex='-1'
                    onClick={onClose}
                    className={styles.modal}>
                    
                    <button
                        onClick={onClose}
                        className={styles.close}>
                        <CloseIcon className={styles.icon} />
                    </button>

                    {hasPrev && 
                        <button
                            onClick={onPrev}
                            className={styles.prev}>
                            <ArrowIcon className={styles.icon} />
                        </button>
                    }

                    <div
                        ref={this.contentRef}
                        className={styles.wrapper}>
                        <a
                            onClick={onNext}
                            href='javascript:void(0)'
                            className={styles.link}>
                            <Img 
                                style={style}
                                critical={true}
                                fluid={photo.fluid} 
                                className={styles.image} />
                        </a>
                        {photo.caption &&
                            <div className={styles.caption}>
                                {photo.caption}
                            </div>
                        }
                    </div>

                    {hasNext &&
                        <button
                            onClick={onNext}
                            className={styles.next}>
                            <ArrowIcon className={styles.icon} />
                        </button>
                    }

                    
                </div>
            </Modal>
        );
    }
};

LightBox.propTypes = {
    photo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        fluid: PropTypes.shape({
            aspectRatio: PropTypes.number.isRequired,
            base64: PropTypes.string.isRequired,
            srcSet: PropTypes.string.isRequired,
            sizes: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
        })
    }),
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired
};

export default LightBox;
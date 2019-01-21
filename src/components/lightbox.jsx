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

    _calculateStyle = () => {
        const { current } = this.contentRef;
        const { photo } = this.props;
        if (!current || !photo) {
            return;
        }

        const { offsetHeight } = current;
        const {
            fluid: {
                aspectRatio
            }
        } = photo;

        const style = aspectRatio >= 1
            ? {
                // landscape photos
                maxHeight: offsetHeight
            }
            : {
                // portrait photos
                maxWidth: offsetHeight * aspectRatio
            };

        this.setState({ style });
    }

    _handleResize = (event) => {
        this._calculateStyle();
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
        window.addEventListener('resize', this._handleResize);
        this._calculateStyle();
    }

    componentDidUpdate = ({ photo: prevPhoto }) => {
        if (prevPhoto !== this.props.photo) {
            this._calculateStyle();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeydown);
        window.removeEventListener('resize', this._handleResize);
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
                        className={styles.lightbox}>
                        <a
                            onClick={onNext}
                            href='javascript:void(0)'
                            className={styles.lightboxLink}>
                            <Img 
                                style={style}
                                critical={true}
                                fluid={photo.fluid} 
                                className={styles.lightboxImage} />
                        </a>
                    </div>

                    {hasNext &&
                        <button
                            onClick={onNext}
                            className={styles.next}>
                            <ArrowIcon className={styles.icon} />
                        </button>
                    }

                    {photo.caption &&
                        <div className={styles.caption}>
                            {photo.caption}
                        </div>
                    }
                </div>
            </Modal>
        );
    }
};

LightBox.propTypes = {
    photo: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
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
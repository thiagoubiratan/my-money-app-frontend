import React, { Component } from 'react';
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../common/layout/row'
import qrCodeImage from '../assets/images/pix-qr-code.png'

class Donation extends Component {
  constructor(props) {
    super(props);
    this.pixKey = 'thiagoubiratan@outlook.com'; // chave PIX atualizada
    this.qrUrl = qrCodeImage; // URL do QR code atualizado
    this.copyPix = this.copyPix.bind(this);
  }

  copyPix() {
    const el = document.createElement('textarea');
    el.value = this.pixKey;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      alert('Chave PIX copiada para a área de transferência');
    } catch (err) {
      alert('Falha ao copiar. Selecione e copie manualmente: ' + this.pixKey);
    }
    document.body.removeChild(el);
  }

  render() {
    return (
      <div>
        <ContentHeader title=' Doação' small='Apoie o projeto' icon="gift" />
        <Content>
          <Row>
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    <i className="fa fa-heart" style={{ marginRight: 8, color: '#dd4b39' }}></i>
                    Contribua com o Projeto
                  </h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    {/* Informações do PIX */}
                    <div className="col-md-7 col-sm-12">
                      <div style={{ padding: '20px 0' }}>
                        <h4 style={{ marginTop: 0, marginBottom: 20, color: '#333' }}>
                          Se você gostou do projeto, sua contribuição é bem-vinda 🙏
                        </h4>
                        
                        <div style={{ 
                          padding: 12, 
                          backgroundColor: '#fff3cd', 
                          borderRadius: 4,
                          borderLeft: '4px solid #ffc107',
                          marginBottom: 20
                        }}>
                          <p style={{ 
                            margin: 0, 
                            color: '#856404',
                            fontSize: 14,
                            lineHeight: 1.6,
                            fontWeight: 500
                          }}>
                            <i className="fa fa-gift" style={{ marginRight: 8, color: '#ffc107' }}></i>
                            Qualquer valor é bem-vindo! Sua contribuição ajuda a manter o projeto.
                          </p>
                        </div>
                        
                        <div style={{ marginBottom: 25 }}>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: 8, 
                            fontWeight: 600,
                            color: '#555',
                            fontSize: 14
                          }}>
                            Chave PIX:
                          </label>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 8
                          }}>
                            <input
                              type="text"
                              readOnly
                              value={this.pixKey}
                              className="form-control"
                              style={{ 
                                fontSize: 16, 
                                fontWeight: 500,
                                backgroundColor: '#f9f9f9',
                                cursor: 'pointer'
                              }}
                              onClick={(e) => e.target.select()}
                            />
                            <button 
                              className="btn btn-success" 
                              onClick={this.copyPix}
                              style={{ whiteSpace: 'nowrap' }}
                              title="Copiar chave PIX"
                            >
                              <i className="fa fa-copy" style={{ marginRight: 5 }}></i>
                              Copiar
                            </button>
                          </div>
                        </div>

                        <div style={{ 
                          padding: 15, 
                          backgroundColor: '#f0f7ff', 
                          borderRadius: 4,
                          borderLeft: '4px solid #3c8dbc'
                        }}>
                          <p style={{ 
                            margin: 0, 
                            color: '#555',
                            fontSize: 14,
                            lineHeight: 1.6
                          }}>
                            <i className="fa fa-info-circle" style={{ marginRight: 8, color: '#3c8dbc' }}></i>
                            Ou use o QR code gerado pelo seu app de pagamentos apontando para a chave acima.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="col-md-5 col-sm-12">
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '20px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          padding: 15,
                          backgroundColor: '#fff',
                          borderRadius: 8,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          marginBottom: 15,
                          display: 'inline-block'
                        }}>
                          <img 
                            src={this.qrUrl} 
                            alt="QR Code PIX" 
                            style={{ 
                              width: 220, 
                              height: 220, 
                              display: 'block',
                              borderRadius: 4
                            }} 
                          />
                        </div>
                        <div style={{ width: '100%', maxWidth: 250 }}>
                          <a 
                            className="btn btn-default btn-block" 
                            href={this.qrUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ marginTop: 10 }}
                          >
                            <i className="fa fa-download" style={{ marginRight: 5 }}></i>
                            Abrir/Salvar QR Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Content>
      </div>
    )
  }
}

export default Donation;

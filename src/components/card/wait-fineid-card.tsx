import { useState } from "react";
import useInterval from "../../hooks/use-interval";
import config from "../../config";
import './spinner.css'; 

/**
 * Wait fine id card component properties
 */
type Props = {
  onCardDetected: () => void;
};

/**
 * Wait fine id card component.
 * 
 * The component is used to wait for fine id card to be detected.
 */
const WaitFineIdCard = ({ onCardDetected }: Props) => {
  const [ readerError, setReaderError ] = useState(false);
  const [ dots, setDots ] = useState(1);
  const [ loading, setLoading ] = useState(true);

  /**
   * Detects a presence of a FineId card by calling the version endpoint of the card reader.
   * 
   * Method checks response from the card reader CSC API. If the response is not ok, the reader error is set to true to 
   * indicate that the card reader is not available. 
   * 
   * If the card reader is available, version resnpose hash algorithms are used to determine if the card is present or not.
   */
  const detectCard = async () => {
    try {
      const response = await fetch(`${config.csc.url}/version`);

      if (!response.ok) {
        setReaderError(true);
        return;
      } 
      
      setReaderError(false);
      
      const responseJson = await response.json();
      const { hashAlgorithms } = responseJson;

      if (hashAlgorithms && hashAlgorithms.trim()) {
        onCardDetected();
      }
    } catch (error) {
      setReaderError(true);
    } finally {
      setLoading(false);
    }
  };

  useInterval(() => {
    detectCard();
  }, config.csc.checkInterval);

  useInterval(() => {
    setDots((dots) => (dots + 1) % 3);
  }, 500);

  if (loading) {
    return (
      <div className="spinner"></div>
    );
  }

  if (readerError) {
    return (
      <div style={{
        textAlign: "center",
      }}>
        <h1> Virhe luettaessa korttia. </h1>
        <p> Ole hyvä ja uudelleenkäynnistä kortinlukija sekä selain ja yritä kirjautumista uudelleen. </p>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: "left",
      width: 600
    }}>
      <h2> Odotetaan korttia{".".repeat(dots + 1)} </h2>
      <p> Olet hyvä ja aseta kortti lukijaan. </p>
    </div>
  );
};

export default WaitFineIdCard;
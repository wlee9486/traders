/**
 * @author heera youn
 * @create date 2023-10-23 23:22:32
 * @modify date 2023-10-28 17:52:51
 * @desc [계좌 등록 절차 시 약관동의]
 */
import React, { useState } from "react";

export default function JoinTerms({ allAgreedState }) {
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
    provisionAgreed: false,
    locationAgreed: false,
  });

  const handleAgreementChange = (event) => {
    const { name, checked } = event.target;

    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
  };

  const handleAllAgreementChange = (event) => {
    const { checked } = event.target;
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementKey) => ({
          ...newAgreements,
          [agreementKey]: checked,
        }),
        {}
      )
    );
  };

  // 모든 동의 상태 업데이트
  React.useEffect(() => {
    const allChecked = Object.values(agreements).every(
      (value) => value === true
    );
    setAllAgreed(allChecked);
    allAgreedState(allChecked);
  }, [agreements, allAgreedState]);

  return (
    <div className="basefont">
      <label className="titleterms">회원가입 약관 동의</label>
      <br />

      <div>
        <input
          type="checkbox"
          id="agree_check_all"
          name="agree_check_all"
          checked={allAgreed}
          onChange={handleAllAgreementChange}
        />
        <label htmlFor="agree_check_all" className="allterms">
          이용약관 전체동의
        </label>
        <br />
        <hr />
      </div>

      <div>
        <input
          type="checkbox"
          id="agree_check_used"
          name="termsAgreed"
          required
          checked={agreements.termsAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agree_check_used">
          &nbsp;이용약관 동의<span className="necessarytext">[필수]</span>
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          id="agree_check_info"
          name="personalInfoAgreed"
          required
          checked={agreements.personalInfoAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agree_check_info">
          &nbsp;개인정보 이용 수집 방침
          <span className="necessarytext">[필수]</span>
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          id="agree_check_info_other"
          name="provisionAgreed"
          required
          checked={agreements.provisionAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agree_check_info_other">
          &nbsp;개인정보 제 3자 제공 동의
          <span className="necessarytext">[필수]</span>
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          id="agree_check_pos"
          name="locationAgreed"
          required
          checked={agreements.locationAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agree_check_pos">
          &nbsp;위치정보 동의 약관<span className="necessarytext">[필수]</span>
        </label>
      </div>
    </div>
  );
}

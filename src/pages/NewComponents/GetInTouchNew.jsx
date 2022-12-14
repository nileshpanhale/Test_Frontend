import React from "react";

export default function GetInTouchNew() {
    const cards = [
        {title:"INR Deposit/Withdrwal", desc:"We will start inr deposit/withdrwal last of october month for user those fill good in INR trade."},
        {title:"BTEX Airdop", desc:"BITFLASH Start distribution BTEX airdrop for those who filled their correct Kyc."},
        {title:"BTEX Refferal Program", desc:"Invite your family & friend to join BITFLASH community and get attractive refferal rewards."},
        {title:"BITFLASH Fees", desc:"Trade in BTEX and get extra benifit with lower trade fees."},
    ]
  return (
    <>
      <div className="container-fluid text-dark starts">
        <h2 className="py-3">Get in Touch. Stay in Touch.</h2>
        <div className="row row-cols-3">
            {cards.map((card)=>(
                <div className="col-lg-3 col-md-6 col-sm-12 h-100">
                    <div className="card card-body h-100">
                        <h3 className="card-title">{card.title}</h3>
                        <p>{card.desc}</p>
                    </div>
                </div>
            ))}
          {/* <div className="col-lg-3 col-md-6 col-sm-12 h-100">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">INR Deposit/Withdrwal</h5>
                <p className="card-text">
                  We will start inr deposit/withdrwal last of october month for
                  user those fill good in INR trade.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-2 ">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">BTEX Airdop</h5>
                <p className="card-text">
                  BITFLASH Start distribution BTEX airdrop for those who filled
                  their correct Kyc.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-2">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">BTEX Refferal Program</h5>
                <p className="card-text">
                  Invite your family & friend to join BITFLASH community and get
                  attractive refferal rewards.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-2 ">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title"> BITFLASH Fees</h5>
                <p className="card-text">
                  Trade in BTEX and get extra benifit with lower trade fees.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
